import './Logo.scss';

const Logo: React.FC = () => {
  return (
    <div className='logo m-0 relative box-content text-purple-600 border-13 before:absolute  before:bg-white'>
      <span className='box-1 absolute bg-purple-600' />
      <span className='box-2 absolute bg-purple-600' />
      <span className='box-3 absolute bg-purple-600' />
      <span className='box-4 absolute bg-purple-600' />
      <span className='box-5 absolute bg-purple-600' />
      <span className='box-6 absolute bg-purple-600' />
    </div>
  );
};

export default Logo;
