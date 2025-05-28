import { Link } from 'react-router-dom';

const Mickles: React.FC = () => {
  return (
    <div className='w-f h-80'>
      <h2 className='text-5xl font-semibold tracking-tight'>
        Mickles Canning Inc.
      </h2>
      <Link to='https://mandismickles.com' className='text-blue-500'>
        https://mandismickles.com
      </Link>
      <p className='my-5'>
        Mickles Canning is a startup business in the food industry. The founders
        needed web & technical assistance and help setting up and growing a new
        business.
      </p>
      <p className='my-5'>
        Bates Solutions architected and built a custom e-commerce website,
        integrated with their payment provider{' '}
        <Link to='https://squareup.com/us/en' className='text-blue-500'>
          squareup.com
        </Link>
        . We designed the UI and UX to match the branding and brand language
        that Mickles hadclear established.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Services Provided
      </h2>
      <p className='my-5'>
        Bates Solutions also supported them through the incorporation process,
        helped build technical documentation to meet regulatory requirements,
        and managed their online technical business accounts.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Technologies
      </h2>
      <ul className='list-disc'>
        <li>Angular, Sass, Rxjs, Karma, Jasmine</li>
        <li>Github Actions, Node, Serverless</li>
        <li>
          Amazon Web Services: S3, Cloudfront, Route53, Lambda, Api Gateway
        </li>
        <li>Squareup API, Google Cloud API, Mapbox</li>
        <li>Canva, Smartdraw</li>
      </ul>
    </div>
  );
};

export default Mickles;
