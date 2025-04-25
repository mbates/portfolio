import { useState } from 'react';
import './Terminal.scss';
import { ReactTerminal } from 'react-terminal';

const Terminal: React.FC = () => {
  const [content, setContent] = useState(''); // switch to redux
  const [project, setProject] = useState(''); // switch to reduc
  const welcomeMessage = (
    <div>
      Type <span className='command-name'>help</span> for commands
    </div>
  );
  const prompt = (
    <span>
      <span className='prompt'>https://bates-solutions.com</span> &gt;
    </span>
  );
  const commands = {
    about: () => {
      setContent('about');
      setProject('');
    },
    contact: () => {
      setContent('contact');
      setProject('');
    },
    send: (message: string) => {
      setContent('contact');
      setProject('');
      console.log('sending: ', message);
    },
    ls: (
      <div>
        <span className='command-name'>casechek</span>
        <br />
        <span className='command-name'>opskwan</span>
        <br />
        <span className='command-name'>mickles</span>
        <br />
      </div>
    ),
    show: (project: string) => {
      setContent('project');
      setProject(project);
    },
    help: (
      <div>
        <span className='command-name'>clear </span>
        clears the console
        <br />
        <span className='command-name'>about </span>
        what we're all about?
        <br />
        <span className='command-name'>send [message] </span>
        send us a message
        <br />
        <span className='command-name'>ls </span>
        list the projects we've worked on <br />
        <span className='command-name'>show [project] </span>
        show project details
        <br />
      </div>
    ),
  };

  const theme = {
    'bates-solutions': {
      themeBGColor: '#012456',
      themeColor: '#ffffff',
      themePromptColor: '#ffffff',
    },
  };

  const defaultHandler = (input: string) => {
    return `I don't know the "${input}" command`;
  };

  return (
    <div className='terminal'>
      <ReactTerminal
        welcomeMessage={welcomeMessage}
        showControlBar={false}
        commands={commands}
        themes={theme}
        theme='bates-solutions'
        defaultHandler={defaultHandler}
        prompt={prompt}
      />
      <div>
        {content}{' '}
        {project &&
          `- ${project}help
        `}
      </div>
    </div>
  );
};

export default Terminal;
