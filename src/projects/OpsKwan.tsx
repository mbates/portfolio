const OpsKwan: React.FC = () => {
  return (
    <div className='w-f h-80'>
      <h2 className='text-5xl font-semibold tracking-tight'>
        OpsKwan Technologies Inc.
      </h2>
      <p className='my-5'>
        OpsKwan was founded by a Medical Device distributorship with a dual
        goal: design and develop a modular solution to solve logistical problems
        they face with their clients (hospitals); enable the sales of this
        solution to other Medical Device companies.
      </p>
      <p className='my-5'>
        As Director of Development, I was tasked with designing a SaaS solution
        with a limited budget and timeframe. After the solution launched, it was
        expanded to work with multiple distributorships controlled by a primary
        company.
      </p>
      <p className='my-5'>
        OpsKwan was deployed across Canada with ZimmerBiomet in 2011 and is used
        to manage their logistics for over 40% of the hospitals nationwide, it
        is one of their business-critical systems.
      </p>
      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Responsibilities
      </h2>
      <ul className='list-disc'>
        <li>
          Architecting, deploying and iteratively building a backend system and
          frontend application
        </li>
        <li>Researching and assessing technologies</li>
        <li>Designing and deploying the infrastructure</li>
        <li>Customer Success / Customer Support</li>
        <li>Internal support (Sales & Accounting)</li>
      </ul>
      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Technologies
      </h2>
      <ul className='list-disc'>
        <li>CakePHP</li>
        <li>Javascript, jQuery</li>
        <li>
          Amazon Web Services: EC2 & ALB, RDS (MySQL), Route53, S3, Cloudfront
        </li>
        <li>Ubuntu with Nginx and Postfix</li>
        <li>Sendgrid</li>
      </ul>
    </div>
  );
};

export default OpsKwan;
