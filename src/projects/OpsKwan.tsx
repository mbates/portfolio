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
        Bates Solutions started working with OpsKwan once a prrof of concept
        application had been developed. We were tasked with rebuilding the
        prototype into a secure and reliable SaaS, tenanted application.
      </p>
      <p className='my-5'>
        OpsKwan was deployed across Canada with ZimmerBiomet in 2011. It was one
        of their business-critical systems used to manage logistics for over 40%
        of the hospitals nationwide.
      </p>

      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Services Provided
      </h2>
      <p className='my-5'>
        Architected, deployed and iteratively built backend and frontend
        systems.
      </p>
      <p className='my-5'>
        We also worked directly with OpsKwans' customers delivering specific
        solutions within the OpsKwan system.
      </p>
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
