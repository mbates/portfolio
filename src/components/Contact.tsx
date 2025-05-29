interface ContactProps {
  message: string;
}

const Contact: React.FC<ContactProps> = ({ message }) => {
  return (
    <div className='w-f h-80'>
      <div>M: {message}</div>
    </div>
  );
};

export default Contact;
