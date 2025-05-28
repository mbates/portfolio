const About: React.FC = () => {
  return (
    <div className='w-f h-80'>
      <h2 className='text-3xl font-semibold tracking-tight my-5'>About</h2>
      <p className='my-5'>
        At Bates Solutions, we are a forward-thinking software development
        company dedicated to building innovative, scalable, and high-performing
        digital solutions. Founded on the principles of excellence, agility, and
        client collaboration, we specialize in custom software development,
        mobile and web applications, cloud integration, and enterprise system
        solutions.
      </p>
      <p className='my-5'>
        We focus on flexibility with our projects, ensuring that we deliver
        solutions that fit your budget.
      </p>
      <p className='my-5'>
        Whether you need to modernize your legacy systems, develop a new digital
        platform, or augment your in-house team, we provide end-to-end software
        development services tailored to your business goals.
      </p>
      <p className='my-5'>
        Bates Solutions is based in Vancouver and has delivered solutions used
        across Canada and the US.
      </p>
      <h2 className='text-3xl font-semibold tracking-tight my-5'>Services</h2>
      <ul className='list-disc'>
        <li>Custom Software Development</li>
        <li>Web and Mobile App Development</li>
        <li>Cloud Solutions & DevOps</li>
        <li>UI/UX Design</li>
      </ul>
    </div>
  );
};

export default About;
