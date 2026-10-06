import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { loadTurnstile, TURNSTILE_SITE_KEY, type TurnstileApi } from '../lib/turnstile';
import { useForm, SubmitHandler } from 'react-hook-form';
import Spinner from './Spinner';

type Inputs = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const WIDGET_FAILED = 'The spam check failed. Please reload the page and try again.';

interface ContactProps {
  message: string;
}

const Contact: React.FC<ContactProps> = ({ message }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  // Set when no token can arrive: the script didn't load, or Cloudflare refused the widget.
  const [widgetFailed, setWidgetFailed] = useState(false);
  const widget = useRef<HTMLDivElement>(null);
  const turnstile = useRef<{ api: TurnstileApi; id: string } | null>(null);

  // The Turnstile check shows itself only when Cloudflare wants an interaction.
  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((api) => {
        if (cancelled || !widget.current) return;
        const id = api.render(widget.current, {
          sitekey: TURNSTILE_SITE_KEY,
          appearance: 'interaction-only',
          callback: setToken,
          'expired-callback': () => setToken(''),
          'error-callback': () => {
            setToken('');
            setWidgetFailed(true);
            setError(WIDGET_FAILED);
          },
        });
        turnstile.current = { api, id };
      })
      .catch(() => {
        if (cancelled) return;
        setWidgetFailed(true);
        setError(WIDGET_FAILED);
      });
    return () => {
      cancelled = true;
      if (turnstile.current) turnstile.current.api.remove(turnstile.current.id);
      turnstile.current = null;
    };
  }, []);

  // A token is good for one send; get a fresh one after each attempt.
  const resetTurnstile = () => {
    setToken('');
    setWidgetFailed(false);
    if (turnstile.current) turnstile.current.api.reset(turnstile.current.id);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!token) {
      setError(widgetFailed ? WIDGET_FAILED : 'Please wait for the spam check to finish, then send again.');
      return;
    }
    try {
      setSending(true);
      setSent(false);
      setError('');
      await axios.post(import.meta.env.VITE_API_URL, { ...data, turnstileToken: token });
      setSending(false);
      setSent(true);
      reset();
    } catch (e: unknown) {
      setSending(false);
      // The Lambda's own message ("Verification failed…") says more than axios's status line.
      const serverError = axios.isAxiosError(e) ? e.response?.data?.error : undefined;
      if (typeof serverError === 'string') {
        setError(serverError);
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      resetTurnstile();
    }
  };

  return (
    <div className='w-f p-3 pr-5'>
      <form className='bg-white' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <br />
          <label
            className='block text-gray-700 text-md font-bold mb-2'
            htmlFor='name'
          >
            Name
          </label>
          <input
            id='name'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
            {...register('name', { required: true })}
          />
          {errors.name && (
            <span className='text-red-600'>This field is required</span>
          )}
        </div>
        <div className='mb-4'>
          <br />
          <label
            className='block text-gray-700 text-md font-bold mb-2'
            htmlFor='email'
          >
            Email
          </label>
          <input
            id='email'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
            {...register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email?.message && (
            <span className='text-red-600'>{errors.email?.message} </span>
          )}
          {errors.email && !errors.email?.message && (
            <span className='text-red-600'>This field is required</span>
          )}
        </div>

        <div className='mb-4'>
          <br />
          <label
            className='block text-gray-700 text-md font-bold mb-2'
            htmlFor='phone'
          >
            Phone
          </label>
          <input
            id='phone'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
            {...register('phone')}
          />
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-md font-bold mb-2'
            htmlFor='message'
          >
            Message
          </label>
          <textarea
            id='message'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
            rows={4}
            defaultValue={message}
            {...register('message', { required: true })}
          />
          {errors.message && (
            <span className='text-red-600'>This field is required</span>
          )}
        </div>

        <div ref={widget} className='mb-4' />

        <div className='mb-4'>
          <button
            className='bg-orange-800 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded cursor-pointer flex disabled:opacity-50 disabled:cursor-not-allowed'
            type='submit'
            disabled={sending}
          >
            {sending && <Spinner />}
            <span>{sending ? 'Sending...' : 'Send'}</span>
          </button>
          {sent && (
            <span className='text-green-600'>
              Thanks, your message has been sent.
            </span>
          )}
          {error && <span className='text-red-600'>Error! {error}</span>}
        </div>
      </form>
    </div>
  );
};

export default Contact;
