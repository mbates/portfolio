import { ReactTerminal } from 'react-terminal';
import { projects } from './Project';

interface TerminalProps {
  setContent: (content: string) => void;
  setProject: (project: string) => void;
  setMessage: (message: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({
  setContent,
  setProject,
  setMessage,
}: TerminalProps) => {
  const welcomeMessage = (
    <div>
      Type <span className='text-yellow-200'>help</span> for commands
    </div>
  );
  const prompt = (
    <span>
      <span className='text-gray-400'>https://bates-solutions.com</span> &gt;
    </span>
  );
  const projectList = projects.map((p) => {
    return (
      <p key={p}>
        <span className='text-yellow-200'>{p}</span>
      </p>
    );
  });
  const commands = {
    about: () => {
      setContent('about');
      setProject('');
      setMessage('');
    },
    send: (message: string) => {
      setContent('contact');
      setProject('');
      setMessage(message);
    },
    ls: <div>{projectList}</div>,
    show: (project: string) => {
      if (projects.includes(project)) {
        setContent('project');
        setProject(project);
        setMessage('');
      } else {
        return `The project "${project}" doesn't exist`;
      }
    },
    help: (
      <div>
        <span className='text-yellow-200'>help </span>
        show all commands
        <br />
        <span className='text-yellow-200'>ls </span>
        list the projects we've worked on <br />
        <span className='text-yellow-200'>show [project] </span>
        project details <br />
        <span className='text-yellow-200'>about </span>
        about us and our services
        <br />
        <span className='text-yellow-200'>send [message to send] </span>
        send us a message
        <br />
        <span className='text-yellow-200'>clear </span>
        clears the console
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
    <div className='w-f h-80'>
      <ReactTerminal
        welcomeMessage={welcomeMessage}
        showControlBar={false}
        commands={commands}
        themes={theme}
        theme='bates-solutions'
        defaultHandler={defaultHandler}
        prompt={prompt}
      />
    </div>
  );
};

export default Terminal;
