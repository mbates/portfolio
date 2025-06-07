import Logo from '../assets/opskwan-logo.png';

const OpsKwan: React.FC = () => {
  return (
    <div className='w-f h-full'>
      <img src={Logo} className='float-right' />
      <p className='my-5'>
        OpsKwan was founded by a Medical Device distributorship with a dual
        goal: design and develop a modular solution to solve logistical problems
        they face with their clients (hospitals); enable the sales of this
        solution to other Medical Device companies.
      </p>
      <p className='my-5'>
        Bates Solutions started working with OpsKwan to take the ideas from
        their proof of concept and a secure and reliable SaaS, tenanted
        application.
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
        Bates Solutions architected, deployed and iteratively built the OpsKwan
        backend and frontend systems.
      </p>
      <p className='my-5'>
        We worked directly with OpsKwans' customers, delivering bespoke
        solutions for them within the OpsKwan system.
      </p>
      <h2 className='text-3xl font-semibold tracking-tight my-5'>
        Technologies
      </h2>
      <ul className='list-disc pl-8'>
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
