import { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

interface ContactProps {
  message: string;
  setMessage: (message: string) => void;
}

const Contact: React.FC<ContactProps> = ({ message, setMessage }) => {
  const [contact, setContact] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contact === '' || message === '') {
      setError(true);
    } else {
      setError(false);
      setSending(true);
      await axios.post(
        'https://427im0p45b.execute-api.us-east-1.amazonaws.com/api/portfolio-message',
        {
          contact,
          message,
        }
      );
      setContact('');
      setMessage('');
      setSending(false);
    }
  };

  return (
    <div className='px-8'>
      <form className='bg-white' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <br />
          <label
            className='block text-gray-700 text-md font-bold mb-2'
            htmlFor='contact'
          >
            Contact (email / phone)
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
            id='contact'
            type='text'
            value={contact}
            onChange={(e) => setContact(e.target.value)}
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
            id='message'
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <button
            className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded cursor-pointer flex'
            type='submit'
          >
            {sending && <Spinner />}
            <span>Send</span>
          </button>
          {error && (
            <div className='block text-red-700 text-md font-bold mb-2'>
              Please enter contact info and a message to send
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Contact;
