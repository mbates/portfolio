import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className='w-f'>
      <p className='my-5'>
        Based in Vancouver, Canada since 2013. We have delivered solutions used
        across Canada and the US.
      </p>

      <h3 className='text-2xl font-semibold tracking-tight my-3'>
        Custom Software Development
      </h3>
      <p className='my-5'>
        Sometimes business problems can't be solved with off the shelf software.
        Bates Solutions has experience with{' '}
        <Link
          target='_blank'
          to='https://visualstudio.microsoft.com/vs/community'
          className='text-blue-500'
        >
          Visual Studio
        </Link>
        {' and '}
        <Link
          target='_blank'
          to='https://www.electronjs.org'
          className='text-blue-500'
        >
          Electron
        </Link>
        , building Windows applications with the former, and cross platform
        applications with the later.
      </p>

      <h3 className='text-2xl font-semibold tracking-tight my-3'>
        Web and Mobile App Development
      </h3>
      <p className='my-5'>
        There are many ways to get software into the hands of your users &
        customers. We have experience developing web applications{' '}
        <Link
          target='_blank'
          to='https://angular.dev'
          className='text-blue-500'
        >
          Angular
        </Link>
        {' and '}
        <Link target='_blank' to='https://react.dev' className='text-blue-500'>
          React
        </Link>
        . For backend systems, we have built experience with{' '}
        <Link
          target='_blank'
          to='https://www.php.net'
          className='text-blue-500'
        >
          PHP
        </Link>
        {', '}
        <Link target='_blank' to='https://nestjs.com' className='text-blue-500'>
          NestJS
        </Link>
        {', '}
        <Link
          target='_blank'
          to='https://nodejs.org/en'
          className='text-blue-500'
        >
          Node
        </Link>
        {' and '}
        <Link
          target='_blank'
          to='https://expressjs.com'
          className='text-blue-500'
        >
          Express
        </Link>
        . The Mobile Apps we have developed were built with either{' '}
        <Link
          target='_blank'
          to='https://flutter.dev'
          className='text-blue-500'
        >
          Flutter
        </Link>
        {' or '}
        <Link
          target='_blank'
          to='https://angular.dev'
          className='text-blue-500'
        >
          Angular
        </Link>
        {' + '}
        <Link target='_blank' to='https://volt.build' className='text-blue-500'>
          Voltbuilder (PhoneGap)
        </Link>
      </p>

      <h3 className='text-2xl font-semibold tracking-tight my-3'>
        Cloud Solutions & DevOps
      </h3>
      <p className='my-5'>
        We have been deplying to{' '}
        <Link
          target='_blank'
          to='https://aws.amazon.com'
          className='text-blue-500'
        >
          Amazon Web Services
        </Link>{' '}
        since 2009, utilizing a wide range of their services. Setting up CI (
        <Link
          target='_blank'
          to='https://github.com/features/actions'
          className='text-blue-500'
        >
          Github Actions
        </Link>
        {' / '}
        <Link
          target='_blank'
          to='https://azure.microsoft.com/en-us/products/devops/pipelines'
          className='text-blue-500'
        >
          Azure Pipelines
        </Link>
        ) to deploy to these services directly or using IaC tools{' '}
        <Link
          target='_blank'
          to='https://aws.amazon.com/cdk'
          className='text-blue-500'
        >
          CDK
        </Link>
        {', '}
        <Link
          target='_blank'
          to='https://developer.hashicorp.com/terraform'
          className='text-blue-500'
        >
          Terraform
        </Link>
        {' or '}
        <Link
          target='_blank'
          to='https://www.serverless.com'
          className='text-blue-500'
        >
          Serverless
        </Link>
      </p>

      <h3 className='text-2xl font-semibold tracking-tight my-3'>
        UI/UX Design
      </h3>
      <p className='my-5'>
        Business needs dictate the approach to take with the front end design.
        When speed to market is important frameworks like{' '}
        <Link
          target='_blank'
          to='https://www.primefaces.org'
          className='text-blue-500'
        >
          Prime Faces
        </Link>
        {' and '}
        <Link
          target='_blank'
          to='https://m3.material.io'
          className='text-blue-500'
        >
          Google Materials
        </Link>{' '}
        handle a lot of the implementation allowing more development time to be
        spent on solving business problems. When more freedom is needed for the
        design we've used the css library{' '}
        <Link
          target='_blank'
          to='https://tailwindcss.com'
          className='text-blue-500'
        >
          TailwindCSS
        </Link>
        . We have also built complete custom web designs using our own HTML/Sass
        components.
      </p>
    </div>
  );
};

export default About;
