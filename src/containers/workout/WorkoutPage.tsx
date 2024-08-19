import { Container } from 'react-bootstrap';
import Workout from '../../components/Workout/Workout';
import { WorkoutProvider } from '../../components/Workout/state/WorkoutContext';

const WorkoutPage = () => {
  return (
    <WorkoutProvider>
      <Container>
        <Workout></Workout>
      </Container>
    </WorkoutProvider>
  );
};

export default WorkoutPage;
