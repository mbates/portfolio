import Casechek from '../projects/Casechek';
import OpsKwan from '../projects/OpsKwan';
import Mickles from '../projects/Mickles';
import Bates from '../projects/Bates';
import JbKarting from '../projects/JbKarting';
import Zeepler from '../projects/Zeepler';
import PaymentSdks from '../projects/PaymentSdks';

interface ProjectProps {
  project: string;
}

export const projects = ['bates', 'casechek', 'jbkarting', 'mickles', 'opskwan', 'sdks', 'zeepler'];

const Project: React.FC<ProjectProps> = ({ project }) => {
  return (
    <div className='w-f h-full'>
      {project === 'casechek' && <Casechek />}
      {project === 'opskwan' && <OpsKwan />}
      {project === 'mickles' && <Mickles />}
      {project === 'bates' && <Bates />}
      {project === 'jbkarting' && <JbKarting />}
      {project === 'zeepler' && <Zeepler />}
      {project === 'sdks' && <PaymentSdks />}
      {!projects.includes(project) && (
        <div>Project "{project}" doesn't exist</div>
      )}
    </div>
  );
};

export default Project;
