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
      <span className='text-white'>Type</span> help
      <span className='text-white'> for commands</span>
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
    git: () => {
      window.open('https://github.com/mbates', '_blank')?.focus();
    },
    ls: <div>{projectList}</div>,
    send: (message: string) => {
      setContent('contact');
      setProject('');
      setMessage(message);
    },
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
        help
        <span className='text-white'> show all commands</span>
        <br />
        ls
        <span className='text-white'> list the projects I've worked on</span>
        <br />
        show [project]
        <span className='text-white'> display project details </span>
        <br />
        git
        <span className='text-white'> open my github repositories</span>
        <br />
        send [message to send]
        <span className='text-white'> send me a message</span>
        <br />
        clear
        <span className='text-white'> clears the console</span>
        <br />
      </div>
    ),
  };
  const theme = {
    'bates-solutions': {
      themeBGColor: '#012456',
      themeColor: 'oklch(0.945 0.129 101.54)',
      themePromptColor: 'oklch(0.707 0.022 261.325)',
    },
  };
  const defaultHandler = (input: string) => {
    return `I don't know the "${input}" command`;
  };

  return (
    <ReactTerminal
      welcomeMessage={welcomeMessage}
      showControlBar={false}
      commands={commands}
      themes={theme}
      theme='bates-solutions'
      defaultHandler={defaultHandler}
      prompt={prompt}
    />
  );
};

export default Terminal;
