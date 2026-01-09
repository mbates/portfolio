# Plan: Lambda Improvements

## Overview

Fix critical issues in the Lambda email handler including error handling, input validation, HTML sanitization, and logging improvements.

## Issues Addressed

| ID | Severity | Issue |
|----|----------|-------|
| L1 | Critical | No error response returned on failure (request hangs) |
| L2 | Critical | No input validation (missing fields crash handler) |
| L3 | Critical | No JSON parse error handling |
| L4 | Critical | HTML injection vulnerability (no sanitization) |
| L5 | High | Console logging PII (email content) |
| L6 | High | Hardcoded CORS origin |
| L7 | Medium | No payload size validation |

## Changes

### 1. Rewrite email.mjs with Proper Error Handling

**File:** `serverless/email.mjs`

```javascript
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const REGION = 'us-east-1';
const sesClient = new SESClient({ region: REGION });

// Simple HTML escaping to prevent injection
const escapeHtml = (text) => {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Validate required fields
const validateInput = (body) => {
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
const buildResponse = (statusCode, body) => {
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
```

### 2. Update Lambda Configuration

**File:** `serverless/lambda.yml`

```yaml
service: bates-portfolio-send
provider:
  name: aws
  runtime: nodejs22.x
  stage: api
  region: us-east-1
  iamRoleStatements:
    - Effect: Allow
      Action:
        - ses:SendEmail
      Resource: '*'
  apiGateway:
    restApiId:
      'Fn::ImportValue': BSPortfolioGW-restApiId
    restApiRootResourceId:
      'Fn::ImportValue': BSPortfolioGW-rootResourceId
functions:
  send-email:
    handler: email.handler
    timeout: 10
    memorySize: 128
    environment:
      RECIPIENT_EMAIL: mbates@bates-solutions.com
      SENDER_EMAIL: portfolio@bates-solutions.com
      CORS_ORIGIN: https://bates-solutions.com
    events:
      - http:
          path: portfolio-message
          method: post
          cors:
            origin: 'https://bates-solutions.com'
            headers:
              - Content-Type
            allowCredentials: false
```

Key changes:
- Added `CORS_ORIGIN` environment variable
- Added explicit timeout and memory settings
- Added proper CORS configuration in event

## Files to Modify

| File | Changes |
|------|--------|
| `serverless/email.mjs` | Complete rewrite with validation, sanitization, error handling |
| `serverless/lambda.yml` | Add CORS_ORIGIN env var, timeout, memory settings |

## Implementation Steps

1. [ ] Update `serverless/email.mjs` with new implementation
2. [ ] Update `serverless/lambda.yml` with new configuration
3. [ ] Test locally with serverless-offline (optional)
4. [ ] Deploy to AWS: `cd serverless && npm run deploy:lambda`
5. [ ] Test contact form submission on live site
6. [ ] Verify error responses work correctly
7. [ ] Check CloudWatch logs for proper logging format

## Testing

### Manual Testing

Test the following scenarios via the contact form:

1. **Valid submission** - All fields filled correctly → Success message
2. **Missing name** - Leave name empty → Validation error
3. **Invalid email** - Enter "not-an-email" → Validation error
4. **Missing message** - Leave message empty → Validation error
5. **HTML injection attempt** - Enter `<script>alert('xss')</script>` in message → Should be escaped in email

### API Testing with curl

```bash
# Valid request
curl -X POST https://427im0p45b.execute-api.us-east-1.amazonaws.com/api/portfolio-message \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"555-1234","message":"Test message"}'

# Missing fields
curl -X POST https://427im0p45b.execute-api.us-east-1.amazonaws.com/api/portfolio-message \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User"}'

# Invalid JSON
curl -X POST https://427im0p45b.execute-api.us-east-1.amazonaws.com/api/portfolio-message \
  -H "Content-Type: application/json" \
  -d 'not json'

# Empty body
curl -X POST https://427im0p45b.execute-api.us-east-1.amazonaws.com/api/portfolio-message \
  -H "Content-Type: application/json"
```

### Expected Responses

**Success (200):**
```json
{"message":"Email sent successfully"}
```

**Validation Error (400):**
```json
{"error":"Validation failed","details":["Name is required","Message is required"]}
```

**Invalid JSON (400):**
```json
{"error":"Invalid JSON in request body"}
```

**Server Error (500):**
```json
{"error":"Failed to send email. Please try again later."}
```

## Security Improvements Summary

1. **Input Validation** - All fields validated for type, presence, and length
2. **HTML Escaping** - All user input escaped before inclusion in email
3. **Error Responses** - All code paths return proper HTTP responses
4. **Safe Logging** - No PII logged to CloudWatch
5. **CORS Configuration** - Origin configurable via environment variable
6. **Reply-To Header** - Added so replies go to the sender, not the portfolio email

## Unit Tests

### 3. Add Lambda Unit Tests

**File:** `serverless/__tests__/email.test.mjs`

Tests for the helper functions and handler:

1. **escapeHtml tests:**
   - Escapes HTML special characters
   - Returns empty string for non-string input
   - Handles empty string

2. **validateInput tests:**
   - Returns valid for complete valid input
   - Returns error for missing name
   - Returns error for missing email
   - Returns error for invalid email format
   - Returns error for missing message
   - Returns error for field length exceeding limits
   - Returns error for null/undefined body

3. **buildResponse tests:**
   - Returns correct status code
   - Includes CORS headers
   - Stringifies body to JSON

4. **handler tests:**
   - Returns 400 for empty body
   - Returns 400 for invalid JSON
   - Returns 400 for validation failures
   - Returns 200 on successful email send (mocked)
   - Returns 500 on SES failure (mocked)
