import { useState } from 'react';
import Spinner from './Spinner';

interface ContactProps {
  message: string;
  setMessage: (message: string) => void;
}

const Contact: React.FC<ContactProps> = ({ message, setMessage }) => {
  const [subject, setSubject] = useState('Message from bates-solutions.com');
  const [sending, setSending] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    console.log('subject : ', subject, 'message : ', message);
  };

  return (
    <div className='px-8'>
      <form className='bg-white' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='subject'
          >
            Subject
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
            id='subject'
            type='text'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
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
        </div>
      </form>
    </div>
  );
};

export default Contact;
