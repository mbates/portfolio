import './Bates.scss';
import { Link } from 'react-router-dom';
import GithubLogo from '../assets/github-logo.png';
import Logo from '../components/Logo';

const Bates: React.FC = () => {
  return (
    <div className='w-full p-3 pr-5'>
      <div className='my-5'>
        <div className='float-right ml-4 mt-1 flex'>
          <Logo />
          <div className='logo text-8xl justify-self-start text-purple-600 flex flex-col translate-y-1'>
            Bates <span>Solutions</span>
          </div>
        </div>
      </div>

      <p className='my-5'>
        Founded in 2013 in Vancouver, Canada. I work with Canadian, US and UK
        software companies, primarily focused on <strong>healthcare software</strong>.
        This portfolio and its supporting projects are open source.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        What I Built
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-5'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-lg mb-2'>This Portfolio</h3>
          <ul className='list-disc pl-5 text-sm space-y-1'>
            <li>React 19 with TypeScript</li>
            <li>Interactive terminal interface</li>
            <li>Tailwind CSS styling</li>
            <li>Serverless contact form (Lambda + SES)</li>
            <li>S3 + CloudFront hosting via GitHub Actions</li>
          </ul>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-lg mb-2'>Microservices Example</h3>
          <ul className='list-disc pl-5 text-sm space-y-1'>
            <li>Kubernetes orchestration</li>
            <li>TypeScript + Express services</li>
            <li>NATS pub/sub messaging</li>
            <li>MongoDB persistence</li>
            <li>Auth service + example service with Jest tests</li>
          </ul>
        </div>
      </div>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Tech Stack
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-2 my-5 text-sm'>
        <div>
          <h4 className='font-semibold'>Frontend</h4>
          <ul className='text-gray-600'>
            <li>React</li>
            <li>react-terminal</li>
            <li>Tailwind CSS</li>
            <li>Axios</li>
            <li>Vite</li>
          </ul>
        </div>
        <div>
          <h4 className='font-semibold'>Backend</h4>
          <ul className='text-gray-600'>
            <li>AWS Lambda</li>
            <li>API Gateway</li>
            <li>SES</li>
            <li>Serverless Framework</li>
          </ul>
        </div>
        <div>
          <h4 className='font-semibold'>Infrastructure</h4>
          <ul className='text-gray-600'>
            <li>S3 + CloudFront</li>
            <li>GitHub Actions CI/CD</li>
            <li>Kubernetes (example)</li>
            <li>NATS + MongoDB (example)</li>
          </ul>
        </div>
      </div>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Source Code
      </h2>
      <div className='flex flex-col space-y-3'>
        <Link
          target='_blank'
          to='https://github.com/mbates/portfolio'
          className='github-button text-blue-500 rounded-full border-2 border-gray-700 p-2 bg-purple-100'
        >
          <img src={GithubLogo} className='w-6 mr-1' alt='GitHub logo' />
          mbates/portfolio
        </Link>
        <Link
          target='_blank'
          to='https://github.com/mbates/bates-solutions-example'
          className='github-button text-blue-500 rounded-full border-2 border-gray-700 p-2 bg-purple-100'
        >
          <img src={GithubLogo} className='w-6 mr-1' alt='GitHub logo' />
          mbates/bates-solutions-example
        </Link>
        <Link
          target='_blank'
          to='https://github.com/mbates/bates-solutions-example-common'
          className='github-button text-blue-500 rounded-full border-2 border-gray-700 p-2 bg-purple-100'
        >
          <img src={GithubLogo} className='w-6 mr-1' alt='GitHub logo' />
          mbates/bates-solutions-example-common
        </Link>
        <Link
          target='_blank'
          to='https://github.com/mbates/bates-solutions-common'
          className='github-button text-blue-500 rounded-full border-2 border-gray-700 p-2 bg-purple-100'
        >
          <img src={GithubLogo} className='w-6 mr-1' alt='GitHub logo' />
          mbates/bates-solutions-common
        </Link>
      </div>

      <br />
    </div>
  );
};

export default Bates;
