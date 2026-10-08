import Casechek from '../projects/Casechek';
import OpsKwan from '../projects/OpsKwan';
import Mickles from '../projects/Mickles';
import Bates from '../projects/Bates';
import JbKarting from '../projects/JbKarting';
import Zeepler from '../projects/Zeepler';
import PaymentSdks from '../projects/PaymentSdks';
import WellPlated from '../projects/WellPlated';
import FirstPoint from '../projects/FirstPoint';

interface ProjectProps {
  project: string;
}

export const projects = ['bates', 'casechek', 'firstpoint', 'jbkarting', 'mickles', 'opskwan', 'sdks', 'wellplated', 'zeepler'];

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
      {project === 'wellplated' && <WellPlated />}
      {project === 'firstpoint' && <FirstPoint />}
      {!projects.includes(project) && (
        <div>Project "{project}" doesn't exist</div>
      )}
    </div>
  );
};

export default Project;
