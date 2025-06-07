import { Link } from 'react-router-dom';
import MandisMicklesLogo from '../assets/mandis-mickles-logo.png';
import MicklesKithcenLogo from '../assets/mickles-kitchen-logo.png';
import LotusLogo from '../assets/lotus-logo.png';

const Mickles: React.FC = () => {
  return (
    <div className='w-f'>
      <Link
        to='https://mandismickles.com'
        className='float-right w-40'
        target='_blank'
      >
        <img src={MandisMicklesLogo} />
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
        <Link
          to='https://squareup.com/us/en'
          target='_blank'
          className='text-blue-500'
        >
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
      <p className='my-5'>
        Mandis Mickles have 2 other websites that were also built, deployed and
        managed by Bates Solutions.{' '}
        <Link
          to='https://mickleskitchen.com'
          target='_blank'
          className='text-blue-500 flex items-center'
        >
          <img src={MicklesKithcenLogo} className='w-6 h-6 mt-1 mr-1' />
          mickleskitchen.com
        </Link>
        <Link
          to='https://lotusbodywork.ca'
          target='_blank'
          className='text-blue-500 flex items-center'
        >
          <img src={LotusLogo} className='w-6 h-6 mt-1 mr-1' />
          lotusbodywork.ca
        </Link>
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
