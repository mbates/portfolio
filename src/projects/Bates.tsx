import './Bates.scss';
import { Link } from 'react-router-dom';
import GithubLogo from '../assets/github-logo.png';
import Logo from '../components/Logo';

const Bates: React.FC = () => {
  return (
    <div className='w-f p-3 pr-5'>
      <p className='my-5'>
        <div className='float-right ml-4 mt-1 flex'>
          <Logo />
          <div className='logo text-8xl justify-self-start text-purple-600 flex flex-col translate-y-1'>
            Bates <span>Solutions</span>
          </div>
        </div>
      </p>
      {/* <h2 className='text-5xl font-semibold tracking-tight'>Zeepler</h2>
      <div>description</div> */}

      <p className='my-5'>
        I founded Bates Solutiuons in 2014 to allow me to work with OpsKwan and
        Casechek at the same time.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight'>Portfolio</h2>
      <p className='my-5'>
        This website is in a public github repository, it has been built with
        react, react-terminal, axios and tailwindcss. It is deployed using
        Github Actions to AWS S3 & Cloudfront. The contact page sends an email
        using AWS, and is deployed with{' '}
        <Link
          target='_blank'
          to='https://www.serverless.com'
          className='text-blue-500'
        >
          Serverless
        </Link>
        , using API Gateway, Lambda and SES.
        <br />
        <br />
        <Link
          target='_blank'
          to='https://github.com/mbates/portfolio'
          className='github-button text-blue-500 rounded-full border-2 border-gray-700 p-2  bg-purple-100'
        >
          <img src={GithubLogo} className='w-6 mr-1' alt="GitHub logo" />
          https://github.com/mbates/portfolio
        </Link>
      </p>

      <h2 className='text-3xl font-semibold tracking-tight'>Microservices</h2>
      <p className='my-5'>
        Simple microservices application built with Kubernetes, TypeScript,
        Express, Nats and Mongo. This project demonstrates how to structure a
        microservice application, it has an auth service and an example service
        that publishes & subscribes to a nats service. Jest tests are also
        included.
        <br />
        <br />
        <Link
          target='_blank'
          to='https://github.com/mbates/bates-solutions-example'
          className='github-button text-blue-500 rounded-full border-2 border-gray-700 p-2 bg-purple-100'
        >
          <img src={GithubLogo} className='w-6 mr-1' alt="GitHub logo" />
          https://github.com/mbates/bates-solutions-example
        </Link>
        <br />
        The project includes 2 npm libraries to share code between services:
        <br />
        <br />
        Common components to use with bates-solutions-example project{' '}
        <Link
          target='_blank'
          to=' https://github.com/mbates/bates-solutions-example-common'
          className='github-button text-blue-500 rounded-full border-2 border-gray-700 p-2  bg-purple-100'
        >
          <img src={GithubLogo} className='w-6 mr-1' alt="GitHub logo" />
          https://github.com/mbates/bates-solutions-example-common
        </Link>
        <br />
        Global components to use with Express projects{' '}
        <Link
          target='_blank'
          to=' https://github.com/mbates/bates-solutions-common'
          className='github-button text-blue-500 rounded-full border-2 border-gray-700 p-2  bg-purple-100'
        >
          <img src={GithubLogo} className='w-6 mr-1' alt="GitHub logo" />
          https://github.com/mbates/bates-solutions-common
        </Link>
      </p>

      <br />
    </div>
  );
};

export default Bates;
