import { about } from '../content/about';

const About: React.FC = () => {
  return (
    <div className='w-full'>
      {about.map((paragraph) => (
        <p key={paragraph} className='my-5'>
          {paragraph}
        </p>
      ))}
      <p className='my-5'>
        Type <code>contact</code> to get in touch.
      </p>
    </div>
  );
};

export default About;
