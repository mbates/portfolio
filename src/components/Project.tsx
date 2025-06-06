import Casechek from '../projects/Casechek';
import OpsKwan from '../projects/OpsKwan';
import Mickles from '../projects/Mickles';
import Bates from '../projects/Bates';

interface ProjectProps {
  project: string;
}

export const projects = ['bates', 'casechek', 'mickles', 'opskwan'];

const Project: React.FC<ProjectProps> = ({ project }) => {
  return (
    <div className='w-f h-full'>
      {project === 'casechek' && <Casechek />}
      {project === 'opskwan' && <OpsKwan />}
      {project === 'mickles' && <Mickles />}
      {project === 'bates' && <Bates />}
      {!projects.includes(project) && (
        <div>Project "{project}" doesn't exist</div>
      )}
    </div>
  );
};

export default Project;
