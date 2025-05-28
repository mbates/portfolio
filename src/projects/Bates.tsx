import { Link } from 'react-router-dom';

const Bates: React.FC = () => {
  return (
    <div className='w-f h-80'>
      {/* <h2 className='text-5xl font-semibold tracking-tight'>Zeepler</h2>
      <div>description</div> */}

      <h2 className='text-5xl font-semibold tracking-tight'>Microservices</h2>
      <p className='my-5'>
        Simple microservices application built with Kubernetes, TypeScript,
        Express, Nats and Mongo. This project demonstrates how to structure a
        Microservice with an auth service and an example service that publishes
        and subscribes to a nats service.
        <br />
        <Link
          target='_blank'
          to='https://github.com/mbates/bates-solutions-example'
          className='text-lg text-blue-500'
        >
          https://github.com/mbates/bates-solutions-example
        </Link>
      </p>
      <p className='my-5'>
        The project includes 2 npm libraries to share code between services.
        <br />
        Common components to use with bates-solutions-example project
        <br />
        <Link
          target='_blank'
          to=' https://github.com/mbates/bates-solutions-example-common'
          className='text-lg text-blue-500'
        >
          https://github.com/mbates/bates-solutions-example-common
        </Link>
        <br />
        Global components to use with Express projects <br />
        <Link
          target='_blank'
          to=' https://github.com/mbates/bates-solutions-common'
          className='text-lg text-blue-500'
        >
          https://github.com/mbates/bates-solutions-common
        </Link>
      </p>

      <h2 className='text-5xl font-semibold tracking-tight'>Portfolio</h2>
      <p className='my-5'>
        This portfolio website has been built with React
        <Link
          target='_blank'
          to='https://github.com/mbates/portfolio'
          className='text-lg text-blue-500'
        >
          https://github.com/mbates/portfolio
        </Link>
      </p>
    </div>
  );
};

export default Bates;
