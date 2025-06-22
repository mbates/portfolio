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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('errors', errors);
    setSending(true);
    setSent(false);
    const res = await axios.post(
      'https://427im0p45b.execute-api.us-east-1.amazonaws.com/api/portfolio-message',
      {
        contact: data.email,
        message: data.message,
      }
    );
    setSending(false);
    setSent(true);
    console.log('res', res);
  };

  return (
    <div className='px-8'>
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
            className='bg-orange-800 hover:bg-orangwe-900 text-white font-bold py-2 px-4 rounded cursor-pointer flex'
            type='submit'
          >
            {sending && <Spinner />}
            <span>Send</span>
          </button>
          {sent && (
            <span className='text-green-600'>
              Thanks, your message has been sent.
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Contact;
