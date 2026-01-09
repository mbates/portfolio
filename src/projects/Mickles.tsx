import { Link } from 'react-router-dom';
import MandisMicklesLogo from '../assets/mandis-mickles-logo.png';
import MicklesKithcenLogo from '../assets/mickles-kitchen-logo.png';
import LotusLogo from '../assets/lotus-logo.png';

const Mickles: React.FC = () => {
  return (
    <div className='w-f p-3 pr-5'>
      <Link
        to='https://mandismickles.com'
        className='float-right w-40'
        target='_blank'
      >
        <img src={MandisMicklesLogo} alt="Mandi's Mickles logo" />
      </Link>
      <p className='my-5'>
        Mickles Canning Inc. is a new gourmet pickle business in Vancouver. They
        sell their pickles in farmers markets and local stores.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Services Provided
      </h2>
      <p className='my-5'>
        I architected, built and deployed a custom e-commerce website,
        integrated with Mickles' payment provider{' '}
        <Link
          to='https://squareup.com/us/en'
          target='_blank'
          className='text-blue-500'
        >
          squareup.com
        </Link>
        . The UI and UX was designed to match the branding and brand language
        that Mandis Mickles had established. I also built the continuous
        integration for the site, deploying it to AWS.
      </p>
      <p className='my-5'>
        I am responsible for the technical & regulatory compliance
        documentation, and technical needs.
      </p>
      <p className='my-5'>
        Mandis Mickles have 3 websies that I built, deployed and manage.{' '}
        <Link
          to='https://mandismickles.com'
          target='_blank'
          className='text-blue-500 flex items-center'
        >
          <img src={MandisMicklesLogo} className='w-6 h-6 mt-1 mr-1' alt="Mandi's Mickles logo" />
          mandismickles.com
        </Link>
        <Link
          to='https://mickleskitchen.com'
          target='_blank'
          className='text-blue-500 flex items-center'
        >
          <img src={MicklesKithcenLogo} className='w-6 h-6 mt-1 mr-1' alt="Mickles Kitchen logo" />
          mickleskitchen.com
        </Link>
        <Link
          to='https://lotusbodywork.ca'
          target='_blank'
          className='text-blue-500 flex items-center'
        >
          <img src={LotusLogo} className='w-6 h-6 mt-1 mr-1' alt="Lotus Bodywork logo" />
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
