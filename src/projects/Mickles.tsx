import MandisMicklesLogo from '../assets/mandis-mickles-logo.png';
import ProjectLayout from '../components/ProjectLayout';

// Facts match the company case study (bates-solutions.com/work/getmickled) and the resume.
const Mickles: React.FC = () => (
  <ProjectLayout
    logo={<img src={MandisMicklesLogo} className='w-32' alt='' />}
    name='getMickled'
    tagline="Founder and principal engineer, since 2019: a multi-tenant commerce platform, grown from Mandi's Mickles' store."
    links={[
      { label: 'getmickled.com', url: 'https://getmickled.com' },
      { label: 'mandismickles.com', url: 'https://mandismickles.com', icon: MandisMicklesLogo },
      { label: 'bisqueco.com', url: 'https://bisqueco.com' },
      { label: 'Case study', url: 'https://bates-solutions.com/work/getmickled' },
    ]}
    metrics={['2 live storefronts', '7 apps on one platform', '19 Terraform modules', '1,106 merged PRs']}
    overview={
      <p>
        Mandi&apos;s Mickles has sold online since 2019 on a store I built for it. In December 2025
        I turned that store into <strong>getMickled</strong>, a platform where each business gets
        its own storefront, admin site, data and payment and shipping accounts, from one code
        base. Bisque &amp; Co became the second business on it in June 2026.
      </p>
    }
    role={[
      {
        title: 'The platform',
        items: [
          'Designed and built it alone, from one store to many',
          "Two live storefronts (Mandi's Mickles, Bisque & Co), tenant admin and an operator console",
          "Admin requests scoped by the business in the user's verified token",
        ],
      },
      {
        title: 'Backend and infrastructure',
        items: [
          'Node 22 Lambdas behind API Gateway, with DynamoDB and Cognito',
          "Each business's secrets in Parameter Store, under its own path",
          'Terraform across 19 modules, deployed by CI through GitHub OIDC',
        ],
      },
      {
        title: 'Checkout',
        items: [
          'Payments through Square, connected per business',
          "Shipping rates from each business's own Shippo account, server-side",
          'Delivery zones as map polygons, matched against the geocoded address',
        ],
      },
    ]}
    techStack={[
      { category: 'Frontend', items: ['Angular', 'TypeScript', 'Nx'] },
      { category: 'Backend', items: ['Node.js on AWS Lambda', 'API Gateway', 'DynamoDB', 'Cognito'] },
      { category: 'Infrastructure', items: ['Terraform', 'S3 + CloudFront', 'GitHub Actions'] },
      { category: 'Integrations', items: ['Square', 'Shippo'] },
    ]}
  />
);

export default Mickles;
