import Casechek from '../projects/Casechek';
import OpsKwan from '../projects/OpsKwan';
import Mickles from '../projects/Mickles';
import Bates from '../projects/Bates';
import JbKarting from '../projects/JbKarting';

interface ProjectProps {
  project: string;
}

export const projects = ['bates', 'casechek', 'jbkarting', 'mickles', 'opskwan'];

const Project: React.FC<ProjectProps> = ({ project }) => {
  return (
    <div className='w-f h-full'>
      {project === 'casechek' && <Casechek />}
      {project === 'opskwan' && <OpsKwan />}
      {project === 'mickles' && <Mickles />}
      {project === 'bates' && <Bates />}
      {project === 'jbkarting' && <JbKarting />}
      {!projects.includes(project) && (
        <div>Project "{project}" doesn't exist</div>
      )}
    </div>
  );
};

export default Project;
