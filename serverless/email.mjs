import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

const REGION = 'us-east-1';
const sesClient = new SESClient({ region: REGION });
// A stalled SSM read fails fast instead of running to the Lambda's timeout, where API Gateway would
// answer without CORS headers. Same settings as the company site's contact Lambda.
const ssmClient = new SSMClient({
  region: REGION,
  maxAttempts: 2,
  requestHandler: { connectionTimeout: 1000, requestTimeout: 2000 },
});

const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

// Error codes that mean the visitor's token is bad. Anything else (a wrong secret, Cloudflare
// having trouble) is our problem, so it throws rather than reading as a bot.
const VISITOR_CODES = new Set(['missing-input-response', 'invalid-input-response', 'timeout-or-duplicate']);

// The Turnstile secret is shared with the company site's contact form (SSM SecureString). Read once
// per container; a failed read is retried on the next request.
let secretPromise;
const turnstileSecret = () => {
  secretPromise ??= ssmClient
    .send(new GetParameterCommand({ Name: process.env.TURNSTILE_SECRET_PARAM, WithDecryption: true }))
    .then((out) => out.Parameter.Value)
    .catch((err) => {
      secretPromise = undefined;
      throw err;
    });
  return secretPromise;
};

// True when Cloudflare accepts the token and it was issued on this site: the widget is shared
// with the company site, so a token minted there mustn't be replayable here.
export const verifyTurnstile = async (token, ip) => {
  // Without it every valid token would be refused as a bot; a broken setup must read as one.
  if (!process.env.TURNSTILE_HOSTNAME) throw new Error('TURNSTILE_HOSTNAME is not set');
  if (typeof token !== 'string' || token === '') return false;
  const res = await fetch(SITEVERIFY, {
    method: 'POST',
    body: new URLSearchParams({ secret: await turnstileSecret(), response: token, remoteip: ip }),
    signal: AbortSignal.timeout(3000),
  });
  if (!res.ok) throw new Error(`Turnstile siteverify answered ${res.status}`);
  const out = await res.json();
  if (out.success === true) return out.hostname === process.env.TURNSTILE_HOSTNAME;
  const codes = out['error-codes'] ?? [];
  if (codes.some((c) => !VISITOR_CODES.has(c))) throw new Error(`Turnstile siteverify: ${codes.join(', ')}`);
  return false;
};

// Simple HTML escaping to prevent injection
export const escapeHtml = (text) => {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Validate required fields
export const validateInput = (body) => {
  const errors = [];

  if (!body || typeof body !== 'object') {
    return { valid: false, errors: ['Invalid request body'] };
  }

  if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
    errors.push('Name is required');
  }

  if (!body.email || typeof body.email !== 'string') {
    errors.push('Email is required');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(body.email)) {
    errors.push('Invalid email format');
  }

  if (!body.message || typeof body.message !== 'string' || body.message.trim() === '') {
    errors.push('Message is required');
  }

  // Limit field lengths to prevent abuse
  if (body.name && body.name.length > 200) {
    errors.push('Name exceeds maximum length');
  }
  if (body.email && body.email.length > 200) {
    errors.push('Email exceeds maximum length');
  }
  if (body.phone && body.phone.length > 50) {
    errors.push('Phone exceeds maximum length');
  }
  if (body.message && body.message.length > 5000) {
    errors.push('Message exceeds maximum length');
  }

  return { valid: errors.length === 0, errors };
};

// The sites allowed to post, comma-separated in CORS_ORIGIN. The response names the request's
// own origin when it's one of them (a browser accepts only an exact match), else the first.
// The apex is the company site's since 2026-10-05, with its own contact endpoint.
const DEFAULT_ORIGINS = 'https://mike.bates-solutions.com';

export const allowedOrigin = (requestOrigin) => {
  const origins = (process.env.CORS_ORIGIN || DEFAULT_ORIGINS).split(',').map((o) => o.trim());
  return origins.includes(requestOrigin) ? requestOrigin : origins[0];
};

// Build response with CORS headers
export const buildResponse = (statusCode, body, requestOrigin) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': allowedOrigin(requestOrigin),
      'Access-Control-Allow-Methods': 'OPTIONS,POST',
      'Content-Type': 'application/json',
      // The allowed origin depends on the request's, so caches must key on it.
      Vary: 'Origin',
    },
    body: JSON.stringify(body),
  };
};

export const handler = async (event, _context, callback) => {
  const origin = event.headers?.origin ?? event.headers?.Origin;
  try {
    // Check for empty body
    if (!event.body) {
      console.warn('Request received with empty body');
      return callback(null, buildResponse(400, { error: 'Request body is required' }, origin));
    }

    // Parse JSON body
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (parseError) {
      console.warn('Failed to parse request body');
      return callback(null, buildResponse(400, { error: 'Invalid JSON in request body' }, origin));
    }

    // Validate input
    const validation = validateInput(body);
    if (!validation.valid) {
      console.warn('Validation failed:', validation.errors);
      return callback(null, buildResponse(400, { error: 'Validation failed', details: validation.errors }, origin));
    }

    // Cloudflare Turnstile: SES reputation is shared across the account, so no bot gets to send.
    let human;
    try {
      human = await verifyTurnstile(body.turnstileToken, event.requestContext?.identity?.sourceIp ?? '');
    } catch (verifyError) {
      console.error('Turnstile check failed:', verifyError.message);
      return callback(null, buildResponse(502, { error: 'Could not verify the request. Please try again later.' }, origin));
    }
    if (!human) {
      console.warn('Turnstile rejected the request');
      return callback(null, buildResponse(403, { error: 'Verification failed. Please try again.' }, origin));
    }

    // Sanitize and build email body
    const emailBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #333;">New Portfolio Message</h2>
      <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(body.phone || 'Not provided')}</p>
      <hr style="border: 1px solid #eee;" />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(body.message)}</p>
    </div>`;

    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [process.env.RECIPIENT_EMAIL],
      },
      Message: {
        Body: {
          Html: { Data: emailBody },
        },
        Subject: { Data: 'Bates Portfolio Message' },
      },
      Source: process.env.SENDER_EMAIL,
      ReplyToAddresses: [body.email],
    });

    // Log without sensitive data
    console.info('Sending email from portfolio contact form');

    await sesClient.send(command);

    console.info('Email sent successfully');
    return callback(null, buildResponse(200, { message: 'Email sent successfully' }, origin));
  } catch (error) {
    // Log error without sensitive details
    console.error('Failed to send email:', error.name, error.message);

    return callback(null, buildResponse(500, { error: 'Failed to send email. Please try again later.' }, origin));
  }
};
