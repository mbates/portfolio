import { Link } from 'react-router-dom';

const Mickles: React.FC = () => {
  return (
    <div className='w-f h-80'>
      <h2 className='text-5xl font-semibold tracking-tight'>
        Mickles Canning Inc.
      </h2>
      <Link to='https://mandismickles.com' className='text-lg text-blue-500'>
        https://mandismickles.com
      </Link>
      <p className='my-5'>
        Mickles Canning is a startup business in the food industry. The founders
        needed web & technical assistance and help setting up and growing a new
        business.
      </p>
      <p className='my-5'>
        I architected and built a custom e-commerce website that interfaced with
        their existing payment provider. Designing the UI and UX to match the
        established brand.
      </p>
      <p className='my-5'>
        I also supported the incorporation process of the company, helped build
        technical documentation to meet regulatory requirements, and managed
        their online technical business accounts.
      </p>
      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Responsibilities
      </h2>
      <ul className='list-disc'>
        <li>
          Responsible for designing, building and managing the company’s web
          presence and ecommerce strategy
        </li>
        <li>Supporting the business with start up advice</li>
        <li>Providing technical support </li>
      </ul>
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
