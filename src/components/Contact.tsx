import { useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import Spinner from './Spinner';

type Inputs = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

interface ContactProps {
  message: string;
}

const Contact: React.FC<ContactProps> = ({ message }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setSending(true);
      setSent(false);
      setError('');
      await axios.post(import.meta.env.VITE_API_URL, data);
      setSending(false);
      setSent(true);
      reset();
    } catch (e: unknown) {
      setSending(false);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred');
      }
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
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
            rows={4}
            defaultValue={message}
            {...register('message', { required: true })}
          />
          {errors.message && (
            <span className='text-red-600'>This field is required</span>
          )}
        </div>

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
