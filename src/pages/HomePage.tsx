import './HomePage.scss';
import { useEffect, useRef, useState } from 'react';
import Terminal from '../components/Terminal';
import About from '../components/About';
import Project from '../components/Project';
import Contact from '../components/Contact';
import CasechekLogo from '../assets/casechek-logo-small.png';
import OpsKwanLogo from '../assets/opskwan-logo-small.png';
import BatesLogo from '../assets/favicon.ico';
import MandisMicklesLogo from '../assets/mandis-mickles-logo.png';

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
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (dialogRef.current?.open && project === '' && content === '') {
      dialogRef.current?.close();
    } else if (!dialogRef.current?.open && (project !== '' || content !== '')) {
      dialogRef.current?.showModal();
    }
  }, [project, content]);

  return (
    <div className='py-12 space-y-8'>
      <div className='terminal'>
        <div className='header'>
          <div className='flex flex-row ml-4 -translate-y-2'>
            <h1 className='text-8xl justify-self-start text-orange-900 flex flex-col translate-y-5'>
              Mike Bates <span>Full Stack Engineer</span>
            </h1>
          </div>
        </div>
        <section>
          <Terminal
            key={focus}
            setProject={setProject}
            setContent={setContent}
            setMessage={setMessage}
          />
        </section>
      </div>
      <dialog
        ref={dialogRef}
        className='animated-dialog rounded-lg w-full h-200 max-w-240 mt-10 justify-self-center shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm'
        aria-label='Project details'
      >
        <div>
          <div className='w-full rounded-t-lg bg-gray-200 flex justify-start items-center space-x-1.5 px-3'>
            <button
              type='button'
              className='w-3 h-3 rounded-full bg-red-400 cursor-pointer hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300'
              onClick={clearProject}
              aria-label='Close dialog'
            ></button>
            <span className='w-3 h-3 rounded-full bg-yellow-400' aria-hidden='true'></span>
            <span className='w-3 h-3 rounded-full bg-green-400' aria-hidden='true'></span>
            {project === 'casechek' && (
              <div className='flex flex-row pt-1 pb-1 pl-3 pr-3 mt-1 ml-2 bg-stone-50 border-white border-l-1 border-t-1 border-r-1 rounded-tl-lg rounded-tr-lg'>
                <img src={CasechekLogo} className='w-4 h-4 mt-1 mr-1' alt="Casechek logo" />{' '}
                <span>Casechek</span>
              </div>
            )}
            {project === 'opskwan' && (
              <div className='flex flex-row pt-1 pb-1 pl-3 pr-3 mt-1 ml-2 bg-stone-50 border-white border-l-1 border-t-1 border-r-1 rounded-tl-lg rounded-tr-lg'>
                <img src={OpsKwanLogo} className='w-4 h-4 mt-1 mr-1' alt="OpsKwan logo" />{' '}
                <span>OpsKwan</span>
              </div>
            )}
            {project === 'mickles' && (
              <div className='flex flex-row pt-1 pb-1 pl-3 pr-3 mt-1 ml-2 bg-stone-50 border-white border-l-1 border-t-1 border-r-1 rounded-tl-lg rounded-tr-lg'>
                <img src={MandisMicklesLogo} className='w-4 h-4 mt-1 mr-1' alt="Mandi's Mickles logo" />{' '}
                <span>Mandis Mickles</span>
              </div>
            )}
            {project === 'bates' && (
              <div className='flex flex-row pt-1 pb-1 pl-3 pr-3 mt-1 ml-2 bg-stone-50 border-white border-l-1 border-t-1 border-r-1 rounded-tl-lg rounded-tr-lg'>
                <img src={BatesLogo} className='w-4 h-4 mt-1 mr-1' alt="Bates Solutions logo" />{' '}
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
          <div className='bg-white h-190 border-t-0 w-full overflow-y-scroll px-4 scroll-thin'>
            {project !== '' && <Project project={project} />}
            {content === 'about' && <About />}
            {content === 'contact' && <Contact message={message} />}
          </div>
        </div>
      </dialog>
    </div>
  );
}
