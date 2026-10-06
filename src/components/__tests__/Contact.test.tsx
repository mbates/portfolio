import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../Contact';

// Mock axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
    isAxiosError: (e: unknown) => !!(e as { isAxiosError?: boolean })?.isAxiosError,
  },
}));

// A fake Turnstile: by default it passes the visitor straight away, as it does for most people.
const turnstile = vi.hoisted(() => ({
  autoPass: true,
  failLoad: false,
  render: vi.fn(),
  reset: vi.fn(),
  remove: vi.fn(),
}));
vi.mock('../../lib/turnstile', () => ({
  TURNSTILE_SITE_KEY: 'site-key',
  loadTurnstile: () =>
    turnstile.failLoad ? Promise.reject(new Error('Turnstile did not load')) : Promise.resolve(turnstile),
}));

import axios from 'axios';

const fillAndSend = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText(/name/i), 'John Doe');
  await user.type(screen.getByLabelText(/email/i), 'john@example.com');
  await user.type(screen.getByLabelText(/message/i), 'Test message');
  await user.click(screen.getByRole('button', { name: /send/i }));
};

describe('Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    turnstile.autoPass = true;
    turnstile.failLoad = false;
    turnstile.render.mockImplementation((_el: HTMLElement, options: { callback: (t: string) => void }) => {
      if (turnstile.autoPass) options.callback('turnstile-token');
      return 'widget-1';
    });
  });

  it('sends the Turnstile token with the message, then resets the widget for the next send', async () => {
    const user = userEvent.setup();
    vi.mocked(axios.post).mockResolvedValueOnce({ data: {} });
    render(<Contact message="" />);
    await waitFor(() => expect(turnstile.render).toHaveBeenCalled());
    expect(turnstile.render.mock.calls[0][1]).toMatchObject({
      sitekey: 'site-key',
      appearance: 'interaction-only',
    });

    await fillAndSend(user);

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(vi.mocked(axios.post).mock.calls[0][1]).toMatchObject({
      name: 'John Doe',
      turnstileToken: 'turnstile-token',
    });
    await waitFor(() => expect(turnstile.reset).toHaveBeenCalledWith('widget-1'));
  });

  it('does not send until Turnstile has passed', async () => {
    const user = userEvent.setup();
    turnstile.autoPass = false;
    render(<Contact message="" />);
    await waitFor(() => expect(turnstile.render).toHaveBeenCalled());

    await fillAndSend(user);

    expect(await screen.findByText(/wait for the spam check/i)).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it.each([
    ['Cloudflare refuses the widget', 'error'],
    ['the script fails to load', 'load'],
  ])('says the spam check failed, not "wait", when %s', async (_label, how) => {
    const user = userEvent.setup();
    turnstile.autoPass = false;
    if (how === 'error') {
      turnstile.render.mockImplementation((_el: HTMLElement, options: { 'error-callback': () => void }) => {
        options['error-callback']();
        return 'widget-1';
      });
    } else {
      turnstile.failLoad = true;
    }
    render(<Contact message="" />);

    expect(await screen.findByText(/spam check failed/i)).toBeInTheDocument();
    await fillAndSend(user);
    expect(screen.getByText(/spam check failed/i)).toBeInTheDocument();
    expect(screen.queryByText(/wait for the spam check/i)).not.toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("shows the server's own error message", async () => {
    const user = userEvent.setup();
    vi.mocked(axios.post).mockRejectedValueOnce({
      isAxiosError: true,
      message: 'Request failed with status code 403',
      response: { data: { error: 'Verification failed. Please try again.' } },
    });
    render(<Contact message="" />);
    await waitFor(() => expect(turnstile.render).toHaveBeenCalled());

    await fillAndSend(user);

    expect(await screen.findByText(/verification failed\. please try again/i)).toBeInTheDocument();
  });

  it('removes the widget when the form closes', async () => {
    const { unmount } = render(<Contact message="" />);
    await waitFor(() => expect(turnstile.render).toHaveBeenCalled());
    unmount();
    expect(turnstile.remove).toHaveBeenCalledWith('widget-1');
  });

  it('renders contact form with all fields', () => {
    render(<Contact message="" />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('pre-fills message when provided', () => {
    render(<Contact message="Hello from terminal" />);

    expect(screen.getByLabelText(/message/i)).toHaveValue('Hello from terminal');
  });

  it('shows validation errors for required fields', async () => {
    const user = userEvent.setup();
    render(<Contact message="" />);

    await user.click(screen.getByRole('button', { name: /send/i }));

    // Multiple required fields show error messages
    const errorMessages = await screen.findAllByText(/this field is required/i);
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('shows error for invalid email', async () => {
    const user = userEvent.setup();
    render(<Contact message="" />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.type(screen.getByLabelText(/message/i), 'Test message');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    const user = userEvent.setup();
    vi.mocked(axios.post).mockResolvedValueOnce({ data: {} });

    render(<Contact message="" />);
    await waitFor(() => expect(turnstile.render).toHaveBeenCalled());

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone/i), '555-1234');
    await user.type(screen.getByLabelText(/message/i), 'Test message');
    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText(/thanks, your message has been sent/i)).toBeInTheDocument();
    });
  });

  it('shows error message on submission failure', async () => {
    const user = userEvent.setup();
    vi.mocked(axios.post).mockRejectedValueOnce(new Error('Network error'));

    render(<Contact message="" />);
    await waitFor(() => expect(turnstile.render).toHaveBeenCalled());

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');
    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText(/error!/i)).toBeInTheDocument();
    });
  });
});
