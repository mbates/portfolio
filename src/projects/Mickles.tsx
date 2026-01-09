import { Link } from 'react-router-dom';
import MandisMicklesLogo from '../assets/mandis-mickles-logo.png';
import MicklesKithcenLogo from '../assets/mickles-kitchen-logo.png';
import LotusLogo from '../assets/lotus-logo.png';

const Mickles: React.FC = () => {
  return (
    <div className='w-full p-3 pr-5'>
      <Link
        to='https://mandismickles.com'
        className='float-right w-40'
        target='_blank'
      >
        <img src={MandisMicklesLogo} alt="Mandi's Mickles logo" />
      </Link>
      <p className='my-5'>
        Full-stack e-commerce platform for a Vancouver-based gourmet pickle business.
        Built as an <strong>Nx monorepo</strong> with customer storefront, admin dashboard,
        and serverless backend APIs.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        What I Built
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-5'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-lg mb-2'>Customer Storefront</h3>
          <ul className='list-disc pl-5 text-sm space-y-1'>
            <li>Product catalog with real-time Square inventory</li>
            <li>Shopping cart with Angular Signals state</li>
            <li>Multi-step checkout with shipping calculation</li>
            <li>Interactive market locator (Mapbox)</li>
            <li>Server-side rendering for SEO</li>
          </ul>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-lg mb-2'>Admin Dashboard</h3>
          <ul className='list-disc pl-5 text-sm space-y-1'>
            <li>Cognito authentication with MFA</li>
            <li>Customer management with Excel export</li>
            <li>FAQ management with drag-and-drop</li>
            <li>Inventory tracking and shipping config</li>
            <li>User role management</li>
          </ul>
        </div>
      </div>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Serverless Backend
      </h2>
      <p className='my-5'>
        14 Lambda functions handling catalog sync, checkout processing, order confirmations,
        and admin operations. SNS pub/sub for order notifications, DynamoDB for admin data.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Infrastructure as Code
      </h2>
      <p className='my-5'>
        Complete AWS infrastructure managed with <strong>Terraform</strong> modules:
        S3 + CloudFront hosting, API Gateway, Lambda, Cognito, DynamoDB, SNS, and Route53.
        Separate dev/prod environments with GitHub Actions CI/CD using OIDC authentication.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Tech Stack
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-2 my-5 text-sm'>
        <div>
          <h4 className='font-semibold'>Frontend</h4>
          <ul className='text-gray-600'>
            <li>Angular 21</li>
            <li>Angular Material</li>
            <li>Tailwind + DaisyUI</li>
            <li>RxJS + Signals</li>
            <li>Mapbox GL</li>
          </ul>
        </div>
        <div>
          <h4 className='font-semibold'>Backend</h4>
          <ul className='text-gray-600'>
            <li>Node.js 20 Lambda</li>
            <li>Express</li>
            <li>Square API</li>
            <li>Shippo</li>
            <li>DynamoDB</li>
          </ul>
        </div>
        <div>
          <h4 className='font-semibold'>Infrastructure</h4>
          <ul className='text-gray-600'>
            <li>Terraform</li>
            <li>AWS Cognito</li>
            <li>CloudFront CDN</li>
            <li>API Gateway</li>
            <li>GitHub Actions</li>
          </ul>
        </div>
      </div>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Managed Sites
      </h2>
      <p className='my-5'>
        I built, deployed, and continue to manage these sites:
      </p>
      <div className='flex flex-col space-y-2'>
        <Link
          to='https://mandismickles.com'
          target='_blank'
          className='text-blue-500 flex items-center hover:underline'
        >
          <img src={MandisMicklesLogo} className='w-6 h-6 mr-2' alt="Mandi's Mickles logo" />
          mandismickles.com
        </Link>
        <Link
          to='https://mickleskitchen.com'
          target='_blank'
          className='text-blue-500 flex items-center hover:underline'
        >
          <img src={MicklesKithcenLogo} className='w-6 h-6 mr-2' alt="Mickles Kitchen logo" />
          mickleskitchen.com
        </Link>
        <Link
          to='https://lotusbodywork.ca'
          target='_blank'
          className='text-blue-500 flex items-center hover:underline'
        >
          <img src={LotusLogo} className='w-6 h-6 mr-2' alt="Lotus Bodywork logo" />
          lotusbodywork.ca
        </Link>
      </div>
    </div>
  );
};

export default Mickles;
