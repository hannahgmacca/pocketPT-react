import { Button, Container, FormControl } from 'react-bootstrap';
import './_workout.scss';
import ActiveRound from './sections/activeRound';
import NewRound from './sections/newRound';
import PreviousRound from './sections/previousRound';
import { WorkoutType } from '../../models/Workout';
import { useWorkout } from '../../state/workout/workoutHook';
import { useState } from 'react';

const Workout = () => {
  const workoutHook = useWorkout();
  const {
    state,
    exercises,
    onUpdateRepCount,
    onUpdateWeightValue,
    onCompleteRound,
    onAddSet,
    onAddRound,
    onEditRound,
    onCompleteWorkout,
    setWorkoutName,
  } = workoutHook;

  const { activeRound, workoutName, completedRoundList } = state;
  const [exerciseFilters, setExerciseFilters] = useState<number[]>([]);

  return (
    <Container className='gx-2'>
      <FormControl
        type='text'
        value={workoutName}
        placeholder='New workout'
        onChange={(e) => setWorkoutName(e.target.value)}
      ></FormControl>
      {activeRound ? (
        <ActiveRound
          activeRound={activeRound}
          onUpdateRepCount={onUpdateRepCount}
          onUpdateWeightValue={onUpdateWeightValue}
          onCompleteRound={onCompleteRound}
          onAddSet={onAddSet}
        />
      ) : (
        <NewRound exercises={exercises} onAddRound={onAddRound} exerciseFilters={exerciseFilters} setExerciseFilters={setExerciseFilters}/>
      )}

      {completedRoundList.map((round, roundIndex) => {
        return (
          <PreviousRound key={roundIndex} round={round} index={roundIndex} onEditRound={onEditRound}></PreviousRound>
        );
      })}
      <Button className='w-100' variant='outline-primary' onClick={() => onCompleteWorkout()}>
        Finish
      </Button>
    </Container>
  );
};

export default Workout;
