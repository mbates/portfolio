import Logo from '../assets/opskwan-logo.png';

const OpsKwan: React.FC = () => {
  return (
    <div className='w-full p-3 pr-5'>
      <img src={Logo} className='float-right w-32' alt="OpsKwan logo" />
      <p className='my-5'>
        Multi-tenant SaaS platform for healthcare supply chain management. Deployed across
        Canada with <strong>ZimmerBiomet</strong>, managing logistics for <strong>40% of
        hospitals nationwide</strong>. <em>(Company shut down in 2020)</em>
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        What I Built
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-5'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-lg mb-2'>Consignment Management</h3>
          <ul className='list-disc pl-5 text-sm space-y-1'>
            <li>Hospital consignment tracking</li>
            <li>Product loans and returns</li>
            <li>Barcode scanning (HIBC/GS1)</li>
            <li>Inventory checks and validation</li>
            <li>Pricing rules and budgets</li>
          </ul>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-lg mb-2'>Biological Products</h3>
          <ul className='list-disc pl-5 text-sm space-y-1'>
            <li>Allograft inventory tracking</li>
            <li>Donor information management</li>
            <li>Expiry date monitoring</li>
            <li>Unit usage and procedures</li>
            <li>Compliance documentation</li>
          </ul>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-lg mb-2'>Procedure Tracking</h3>
          <ul className='list-disc pl-5 text-sm space-y-1'>
            <li>Surgical procedure documentation</li>
            <li>Purchase order generation</li>
            <li>Invoice and waybill management</li>
            <li>Shipping logistics</li>
            <li>Hospital integration</li>
          </ul>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-lg mb-2'>Multi-App Platform</h3>
          <ul className='list-disc pl-5 text-sm space-y-1'>
            <li>Company portal for suppliers</li>
            <li>Distributor management app</li>
            <li>Real-time tracker dashboard</li>
            <li>Admin console with reporting</li>
            <li>CDN for documents and images</li>
          </ul>
        </div>
      </div>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Architecture
      </h2>
      <p className='my-5'>
        5 concurrent applications behind Nginx reverse proxy, with multi-tenant database
        architecture supporting isolated client data. 114+ data models covering the full
        lifecycle of medical products from manufacturing through hospital usage.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Tech Stack
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-2 my-5 text-sm'>
        <div>
          <h4 className='font-semibold'>Backend</h4>
          <ul className='text-gray-600'>
            <li>CakePHP</li>
            <li>PHP 5.6-FPM</li>
            <li>MariaDB/MySQL</li>
            <li>Swift Mailer</li>
            <li>HTML2PDF</li>
          </ul>
        </div>
        <div>
          <h4 className='font-semibold'>Frontend</h4>
          <ul className='text-gray-600'>
            <li>JavaScript</li>
            <li>jQuery</li>
            <li>Custom Acme theme</li>
            <li>Barcode scanning</li>
            <li>PDF generation</li>
          </ul>
        </div>
        <div>
          <h4 className='font-semibold'>Infrastructure</h4>
          <ul className='text-gray-600'>
            <li>Docker Compose</li>
            <li>Nginx Alpine</li>
            <li>AWS EC2/RDS</li>
            <li>S3/CloudFront</li>
            <li>Amazon SQS</li>
          </ul>
        </div>
      </div>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Key Components
      </h2>
      <p className='text-sm text-gray-600'>
        HIBC/GS1 barcode parser, ACL authorization, APCu caching, Xdebug, SendGrid email
      </p>
    </div>
  );
};

export default OpsKwan;
