import './HomePage.scss';
import { useState } from 'react';
import Logo from '../components/Logo';
import Terminal from '../components/Terminal';
import About from '../components/About';
import Project from '../components/Project';
import Contact from '../components/Contact';

export default function HomePage() {
  const [content, setContent] = useState('');
  const [project, setProject] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className='container py-12 space-y-8 max-w-280'>
      <div className='header'>
        <Logo />
        <div className='grid grid-rows'>
          <h1 className='text-8xl justify-self-start text-purple-600'>
            Bates Solutions
          </h1>
        </div>
      </div>
      <div>
        <Terminal
          setProject={setProject}
          setContent={setContent}
          setMessage={setMessage}
        />
      </div>
      <div>{content === 'about' && <About />}</div>
      <div>
        {content === 'contact' && (
          <Contact message={message} setMessage={setMessage} />
        )}
      </div>
      <div>{project !== '' && <Project project={project} />}</div>
    </div>
  );
}
