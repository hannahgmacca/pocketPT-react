import { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import WorkoutCarousel from '../../components/WorkoutCarousel/WorkoutCarousel';
import WorkoutList from '../../components/WorkoutList/WorkoutList';
import { Workout, WorkoutShort } from '../../models/Workout';
import { AppContext } from '../../state/AppContext';
import APIClient from '../../apis/APIClient';
import WorkoutAPI from '../../apis/WorkoutAPI';

interface indexViewModel {
  activeWorkout: Workout;
  completedWorkouts: WorkoutShort[];
}

const Home = () => {
  const [previousWorkouts, setPreviousWorkouts] = useState([] as WorkoutShort[]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AppContext);

  const apiClient = new APIClient();
  const workoutClient = new WorkoutAPI(apiClient);

  useEffect(() => {
    getPreviousWorkouts();
  }, []);

  const getPreviousWorkouts = async () => {
    try {
      setIsLoading(true);
      const previousWorkouts = await workoutClient.getAllWorkouts();
      setPreviousWorkouts(previousWorkouts);
    } catch {
      // catch here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className='gx-2'>
      {!isLoading ? (
        <Container>
          <Row className='mt-5'>
            <h1 className='fw-bold'>Time to get</h1>
            <h1 className='fw-bold'>active {user?.firstName}!</h1>
          </Row>
          {user?.activeWorkout && <WorkoutCarousel activeWorkout={user.activeWorkout}></WorkoutCarousel>}
          <WorkoutList title='Previous Workouts' workoutList={previousWorkouts}></WorkoutList>{' '}
        </Container>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

export default Home;
