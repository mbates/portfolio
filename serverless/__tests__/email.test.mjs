import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the SES client before importing the module
const mockSend = vi.fn();
vi.mock('@aws-sdk/client-ses', () => {
  return {
    SESClient: class {
      send = mockSend;
    },
    SendEmailCommand: class {
      constructor(params) {
        this.params = params;
      }
    },
  };
});

// Now import the module after the mock is set up
const { escapeHtml, validateInput, buildResponse, handler } = await import('../email.mjs');

describe('escapeHtml', () => {
  it('escapes HTML special characters', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
  });

  it('escapes ampersands', () => {
    expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
  });

  it('escapes single quotes', () => {
    expect(escapeHtml("it's")).toBe('it&#039;s');
  });

  it('returns empty string for non-string input', () => {
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
    expect(escapeHtml(123)).toBe('');
    expect(escapeHtml({})).toBe('');
  });

  it('handles empty string', () => {
    expect(escapeHtml('')).toBe('');
  });
});

describe('validateInput', () => {
  it('returns valid for complete valid input', () => {
    const result = validateInput({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello world',
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('accepts optional phone field', () => {
    const result = validateInput({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-1234',
      message: 'Hello world',
    });
    expect(result.valid).toBe(true);
  });

  it('returns error for missing name', () => {
    const result = validateInput({
      email: 'john@example.com',
      message: 'Hello',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Name is required');
  });

  it('returns error for empty name', () => {
    const result = validateInput({
      name: '   ',
      email: 'john@example.com',
      message: 'Hello',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Name is required');
  });

  it('returns error for missing email', () => {
    const result = validateInput({
      name: 'John',
      message: 'Hello',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Email is required');
  });

  it('returns error for invalid email format', () => {
    const result = validateInput({
      name: 'John',
      email: 'not-an-email',
      message: 'Hello',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Invalid email format');
  });

  it('returns error for missing message', () => {
    const result = validateInput({
      name: 'John',
      email: 'john@example.com',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Message is required');
  });

  it('returns error for name exceeding max length', () => {
    const result = validateInput({
      name: 'a'.repeat(201),
      email: 'john@example.com',
      message: 'Hello',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Name exceeds maximum length');
  });

  it('returns error for email exceeding max length', () => {
    const result = validateInput({
      name: 'John',
      email: 'a'.repeat(190) + '@example.com',
      message: 'Hello',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Email exceeds maximum length');
  });

  it('returns error for phone exceeding max length', () => {
    const result = validateInput({
      name: 'John',
      email: 'john@example.com',
      phone: '1'.repeat(51),
      message: 'Hello',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Phone exceeds maximum length');
  });

  it('returns error for message exceeding max length', () => {
    const result = validateInput({
      name: 'John',
      email: 'john@example.com',
      message: 'a'.repeat(5001),
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Message exceeds maximum length');
  });

  it('returns error for null body', () => {
    const result = validateInput(null);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Invalid request body');
  });

  it('returns error for undefined body', () => {
    const result = validateInput(undefined);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Invalid request body');
  });

  it('returns multiple errors for multiple issues', () => {
    const result = validateInput({
      name: '',
      email: 'invalid',
      message: '',
    });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(1);
  });
});

describe('buildResponse', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns correct status code', () => {
    const response = buildResponse(200, { message: 'OK' });
    expect(response.statusCode).toBe(200);
  });

  it('returns 400 status code for errors', () => {
    const response = buildResponse(400, { error: 'Bad request' });
    expect(response.statusCode).toBe(400);
  });

  it('includes CORS headers', () => {
    const response = buildResponse(200, { message: 'OK' });
    expect(response.headers['Access-Control-Allow-Origin']).toBe('https://bates-solutions.com');
    expect(response.headers['Access-Control-Allow-Methods']).toBe('OPTIONS,POST');
    expect(response.headers['Access-Control-Allow-Headers']).toBe('Content-Type');
  });

  it('uses CORS_ORIGIN env var when set', () => {
    process.env.CORS_ORIGIN = 'https://custom-domain.com';
    const response = buildResponse(200, { message: 'OK' });
    expect(response.headers['Access-Control-Allow-Origin']).toBe('https://custom-domain.com');
  });

  it('stringifies body to JSON', () => {
    const response = buildResponse(200, { message: 'OK', data: [1, 2, 3] });
    expect(response.body).toBe('{"message":"OK","data":[1,2,3]}');
  });

  it('includes Content-Type header', () => {
    const response = buildResponse(200, {});
    expect(response.headers['Content-Type']).toBe('application/json');
  });
});

describe('handler', () => {
  let mockCallback;

  beforeEach(() => {
    mockCallback = vi.fn();
    mockSend.mockReset();
    mockSend.mockResolvedValue({});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns 400 for empty body', async () => {
    await handler({ body: null }, {}, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith(
      null,
      expect.objectContaining({
        statusCode: 400,
      })
    );
    const response = mockCallback.mock.calls[0][1];
    expect(JSON.parse(response.body)).toEqual({ error: 'Request body is required' });
  });

  it('returns 400 for invalid JSON', async () => {
    await handler({ body: 'not json' }, {}, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith(
      null,
      expect.objectContaining({
        statusCode: 400,
      })
    );
    const response = mockCallback.mock.calls[0][1];
    expect(JSON.parse(response.body)).toEqual({ error: 'Invalid JSON in request body' });
  });

  it('returns 400 for validation failures', async () => {
    await handler(
      {
        body: JSON.stringify({ name: 'John' }),
      },
      {},
      mockCallback
    );

    expect(mockCallback).toHaveBeenCalledWith(
      null,
      expect.objectContaining({
        statusCode: 400,
      })
    );
    const response = mockCallback.mock.calls[0][1];
    const body = JSON.parse(response.body);
    expect(body.error).toBe('Validation failed');
    expect(body.details).toContain('Email is required');
  });

  it('returns 200 on successful email send', async () => {
    await handler(
      {
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Hello world',
        }),
      },
      {},
      mockCallback
    );

    expect(mockSend).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalledWith(
      null,
      expect.objectContaining({
        statusCode: 200,
      })
    );
    const response = mockCallback.mock.calls[0][1];
    expect(JSON.parse(response.body)).toEqual({ message: 'Email sent successfully' });
  });

  it('returns 500 on SES failure', async () => {
    mockSend.mockRejectedValueOnce(new Error('SES Error'));

    await handler(
      {
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Hello world',
        }),
      },
      {},
      mockCallback
    );

    expect(mockCallback).toHaveBeenCalledWith(
      null,
      expect.objectContaining({
        statusCode: 500,
      })
    );
    const response = mockCallback.mock.calls[0][1];
    expect(JSON.parse(response.body)).toEqual({
      error: 'Failed to send email. Please try again later.',
    });
  });
});
