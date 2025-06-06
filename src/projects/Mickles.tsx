import { Link } from 'react-router-dom';
import Logo from '../assets/mickles-logo.png';

const Mickles: React.FC = () => {
  return (
    <div className='w-f h-80'>
      <Link
        to='https://mandismickles.com'
        className='float-right w-40'
        target='_blank'
      >
        <img src={Logo} />
      </Link>
      <p className='my-5'>
        Mickles Canning is a startup business in the food industry. The founders
        needed web & technical assistance and help setting up and growing a new
        business.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Services Provided
      </h2>
      <p className='my-5'>
        Bates Solutions architected and built a custom e-commerce website,
        integrated with Mickles' payment provider{' '}
        <Link to='https://squareup.com/us/en' className='text-blue-500'>
          squareup.com
        </Link>
        . We designed the UI and UX to match the branding and brand language
        that Mandis Mickles had established.
      </p>
      <p className='my-5'>
        We also supported them through their incorporation process, helped build
        technical documentation to meet regulatory requirements, and managed
        their online technical business accounts.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Technologies
      </h2>
      <ul className='list-disc pl-8'>
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
