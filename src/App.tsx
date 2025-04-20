import './App.css';
import { ReactTerminal } from 'react-terminal';

function App() {
  const welcomeMessage = (
    <div>
      Type <span className='command-name'>help</span> for all available commands
    </div>
  );
  const prompt = (
    <span>
      <span className='prompt'>https://bates-solutions.com</span> &gt;
    </span>
  );
  const commands = {
    about: () => {
      // open dialog
    },
    web: () => {
      // route to web home page
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
    show: (project: string) => `getting info on ${project}`,
    help: (
      <div>
        <span className='command-name'>web </span>
        get me out of here, I want a normal website! :)
        <br />
        <span className='command-name'>clear </span>
        clears the console
        <br />
        <span className='command-name'>about </span>
        what we're all about?
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
    <>
      <h1>Bates Solutions</h1>
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
      </div>
    </>
  );
}

export default App;
