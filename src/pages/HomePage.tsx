import './HomePage.scss';
import { useEffect, useRef, useState } from 'react';
import Logo from '../components/Logo';
import Terminal from '../components/Terminal';
import About from '../components/About';
import Project from '../components/Project';
import Contact from '../components/Contact';
import CasechekLogo from '../assets/casechek-logo-small.png';
import OpsKwanLogo from '../assets/opskwan-logo-small.png';
import BatesLogo from '../assets/favicon.ico';
import MicklesLogo from '../assets/mickles-logo.png';

export default function HomePage() {
  const [content, setContent] = useState('');
  const [project, setProject] = useState('');
  const [message, setMessage] = useState('');
  const [focus, setFocus] = useState(1);

  const clearProject = () => {
    setFocus(Math.random());
    setProject('');
    setContent('');
    setMessage('');
  };
  const projectDialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (projectDialogRef.current?.open && project === '' && content === '') {
      projectDialogRef.current?.close();
    } else if (
      !projectDialogRef.current?.open &&
      (project !== '' || content !== '')
    ) {
      projectDialogRef.current?.showModal();
    }
  }, [project, content]);

  return (
    <div className='py-12 space-y-8 max-w-300'>
      <div className='header'>
        <div className='flex flex-row'>
          <Logo />
          <h1 className='text-8xl justify-self-start text-purple-600 flex flex-col'>
            Bates <span>Solutions</span>
          </h1>
        </div>
      </div>
      <div>
        <Terminal
          key={focus}
          setProject={setProject}
          setContent={setContent}
          setMessage={setMessage}
        />
      </div>
      <dialog
        ref={projectDialogRef}
        className='rounded-lg w-full max-w-300 mt-4 justify-self-center shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm'
      >
        <div>
          <div className='w-full h-11 rounded-t-lg bg-gray-200 flex justify-start items-center space-x-1.5 px-3'>
            <span
              className='w-3 h-3 rounded-full bg-red-400 cursor-pointer'
              onClick={clearProject}
            ></span>
            <span className='w-3 h-3 rounded-full bg-yellow-400'></span>
            <span className='w-3 h-3 rounded-full bg-green-400'></span>
            {project === 'casechek' && (
              <div className='flex flex-row pt-1 pb-1 pl-3 pr-3 mt-1 ml-2 bg-stone-50 border-white border-l-1 border-t-1 border-r-1 rounded-tl-lg rounded-tr-lg'>
                <img src={CasechekLogo} className='w-4 h-4 mt-1 mr-1' />{' '}
                <span>Casechek</span>
              </div>
            )}
            {project === 'opskwan' && (
              <div className='flex flex-row pt-1 pb-1 pl-3 pr-3 mt-1 ml-2 bg-stone-50 border-white border-l-1 border-t-1 border-r-1 rounded-tl-lg rounded-tr-lg'>
                <img src={OpsKwanLogo} className='w-4 h-4 mt-1 mr-1' />{' '}
                <span>OpsKwan</span>
              </div>
            )}
            {project === 'mickles' && (
              <div className='flex flex-row pt-1 pb-1 pl-3 pr-3 mt-1 ml-2 bg-stone-50 border-white border-l-1 border-t-1 border-r-1 rounded-tl-lg rounded-tr-lg'>
                <img src={MicklesLogo} className='w-4 h-4 mt-1 mr-1' />{' '}
                <span>Mandis Mickles</span>
              </div>
            )}
            {project === 'bates' && (
              <div className='flex flex-row pt-1 pb-1 pl-3 pr-3 mt-1 ml-2 bg-stone-50 border-white border-l-1 border-t-1 border-r-1 rounded-tl-lg rounded-tr-lg'>
                <img src={BatesLogo} className='w-4 h-4 mt-1 mr-1' />{' '}
                <span>Bates Solutions</span>
              </div>
            )}
            {content === 'about' && (
              <div className='capitalize flex flex-row pt-1 pb-1 pl-3 pr-3 mt-1 ml-2 bg-stone-50 border-white border-l-1 border-t-1 border-r-1 rounded-tl-lg rounded-tr-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-5 mt-[2px] mr-1'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z'
                  />
                </svg>
                About
              </div>
            )}
            {content === 'contact' && (
              <div className='capitalize flex flex-row pt-1 pb-1 pl-3 pr-3 mt-1 ml-2 bg-stone-50 border-white border-l-1 border-t-1 border-r-1 rounded-tl-lg rounded-tr-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-5 mt-[2px] mr-1'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25'
                  />
                </svg>
                Contact
              </div>
            )}
          </div>
          <div className='bg-white border-t-0 w-full h-140 overflow-y-scroll px-4 scroll-thin'>
            {project !== '' && <Project project={project} />}
            {content === 'about' && <About />}
            {content === 'contact' && (
              <Contact message={message} setMessage={setMessage} />
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
