import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const REGION = 'us-east-1';
const sesClient = new SESClient({ region: REGION });

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

// Build response with CORS headers
export const buildResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || 'https://bates-solutions.com',
      'Access-Control-Allow-Methods': 'OPTIONS,POST',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
};

export const handler = async (event, _context, callback) => {
  try {
    // Check for empty body
    if (!event.body) {
      console.warn('Request received with empty body');
      return callback(null, buildResponse(400, { error: 'Request body is required' }));
    }

    // Parse JSON body
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (parseError) {
      console.warn('Failed to parse request body');
      return callback(null, buildResponse(400, { error: 'Invalid JSON in request body' }));
    }

    // Validate input
    const validation = validateInput(body);
    if (!validation.valid) {
      console.warn('Validation failed:', validation.errors);
      return callback(null, buildResponse(400, { error: 'Validation failed', details: validation.errors }));
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
    return callback(null, buildResponse(200, { message: 'Email sent successfully' }));
  } catch (error) {
    // Log error without sensitive details
    console.error('Failed to send email:', error.name, error.message);

    return callback(null, buildResponse(500, { error: 'Failed to send email. Please try again later.' }));
  }
};
