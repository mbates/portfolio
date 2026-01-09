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
    about: () => {
      setContent('about');
      setProject('');
      setMessage('');
    },
    contact: () => {
      setContent('contact');
      setProject('');
      setMessage('');
    },
    git: () => {
      window.open('https://github.com/mbates', '_blank')?.focus();
    },
    linkedin: () => {
      window.open(
        'https://www.linkedin.com/in/m-bates-baab51333/',
        '_blank'
      )?.focus();
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
    skills: (
      <div>
        <span className='text-yellow-200'>Frontend:</span>
        <span className='text-white'> Angular, React, Flutter, RxJS, Electron</span>
        <br />
        <span className='text-yellow-200'>Backend:</span>
        <span className='text-white'> NestJS, Symfony, PHP, Node.js, C#</span>
        <br />
        <span className='text-yellow-200'>Database:</span>
        <span className='text-white'> PostgreSQL, MySQL, DynamoDB, Aurora</span>
        <br />
        <span className='text-yellow-200'>AWS:</span>
        <span className='text-white'>
          {' '}
          EC2, Lambda, ECS, S3, CloudFront, RDS, API Gateway
        </span>
        <br />
        <span className='text-yellow-200'>DevOps:</span>
        <span className='text-white'>
          {' '}
          Terraform, Docker, GitHub Actions, Serverless
        </span>
        <br />
        <span className='text-yellow-200'>Testing:</span>
        <span className='text-white'> Jest, Cypress, PHPUnit, Karma, Jasmine</span>
        <br />
      </div>
    ),
    help: (
      <div>
        help
        <span className='text-white'> show all commands</span>
        <br />
        about
        <span className='text-white'> learn more about me</span>
        <br />
        skills
        <span className='text-white'> list my technical skills</span>
        <br />
        ls
        <span className='text-white'> list the projects I've worked on</span>
        <br />
        show [project]
        <span className='text-white'> display project details</span>
        <br />
        git
        <span className='text-white'> open my GitHub profile</span>
        <br />
        linkedin
        <span className='text-white'> open my LinkedIn profile</span>
        <br />
        contact
        <span className='text-white'> open the contact form</span>
        <br />
        send [message]
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
