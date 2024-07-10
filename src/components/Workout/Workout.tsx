import { Button, Container, FormControl } from 'react-bootstrap';
import './_workout.scss';
import ActiveRound from './sections/activeRound';
import NewRound from './sections/newRound';
import PreviousRound from './sections/previousRound';
import { useContext, useState } from 'react';
import { WorkoutContext } from '../../state/workout/WorkoutContext';

const Workout = () => {
  const {
    state,
    exercises,
    onDeleteRound,
    onAddRound,
    onEditRound,
    onCompleteWorkout,
    setWorkoutName,
  } = useContext(WorkoutContext);

  const { activeRound, workoutName, completedRoundList } = state;

  return (
    <Container className='gx-2'>
      <FormControl
        type='text'
        value={workoutName}
        placeholder='New workout'
        onChange={(e) => setWorkoutName(e.target.value)}
      ></FormControl>
      {activeRound ? (
        <ActiveRound activeRound={activeRound}
         
        />
      ) : (
        <NewRound/>
      )}

      {completedRoundList.map((round, roundIndex) => {
        return (
          <PreviousRound key={roundIndex} round={round} index={roundIndex} onEditRound={onEditRound} onDeleteRound={onDeleteRound}></PreviousRound>
        );
      })}
      <Button className='w-100' variant='outline-primary' onClick={() => onCompleteWorkout()}>
        Finish
      </Button>
    </Container>
  );
};

export default Workout;
