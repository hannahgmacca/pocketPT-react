import { Button, Container, FormControl, Spinner } from 'react-bootstrap';
import './_workout.scss';
import ActiveRound from './sections/activeRound';
import NewRound from './sections/newRound';
import PreviousRound from '../Round/PreviousRound';
import { useContext } from 'react';
import { WorkoutContext } from './state/WorkoutContext';
import EditExerciseModal from './sections/EditExerciseModal';
import ExerciseHistoryModal from '../ExerciseHistoryModal/ExerciseHistoryModal';

const Workout = () => {
  const {
    state,
    onCompleteWorkout,
    setWorkoutName,
    loading,
    exerciseHistoryModalOpen,
    exerciseHistories,
    setExerciseHistoryModalOpen,
    onEditRound,
    onDeleteRound,
  } = useContext(WorkoutContext);

  const { activeRound, workoutName, completedRoundList } = state;

  return (
    <Container className='gx-2'>
      {loading ? (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <FormControl
            type='text'
            value={workoutName}
            placeholder='New workout'
            onChange={(e) => setWorkoutName(e.target.value)}
          ></FormControl>
          {activeRound ? <ActiveRound activeRound={activeRound} /> : <NewRound />}

          {completedRoundList.map((round, roundIndex) => {
            return (
              <PreviousRound
                key={roundIndex}
                round={round}
                index={roundIndex}
                onEditRound={onEditRound}
                onDeleteRound={onDeleteRound}
              ></PreviousRound>
            );
          })}
          <Button className='w-100' variant='outline-primary' onClick={() => onCompleteWorkout()}>
            Finish
          </Button>
        </>
      )}
      <EditExerciseModal></EditExerciseModal>
      <ExerciseHistoryModal
        isOpen={exerciseHistoryModalOpen}
        exerciseHistories={exerciseHistories}
        setClosed={setExerciseHistoryModalOpen}
      ></ExerciseHistoryModal>
    </Container>
  );
};

export default Workout;
