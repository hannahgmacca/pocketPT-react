import { useCallback, useEffect, useReducer, useState } from "react";
import WorkoutReducer, { initialWorkoutState } from "./state/workoutReducer";
import { Button, Container } from "react-bootstrap";
import { Set } from "../../models/Set";
// import { useRouteMatch } from "react-router-dom";
import { WorkoutActionList, WorkoutActions } from "./state/workoutActions";
import "./_workout.scss";
import { Exercise } from "../../models/Exercise";
import ActiveRound from "./sections/activeRound";
import NewRound from "./sections/newRound";
import PreviousRound from "./sections/previousRound";
import APIClient from '../../apis/APIClient';
import WorkoutAPI from '../../apis/WorkoutAPI';
import { WorkoutType } from '../../models/Workout';
import { useNavigate } from 'react-router-dom';
import ExerciseAPI from '../../apis/ExercisePickerAPI';

interface RouterParams {
  workoutId: string;
  workoutType: WorkoutType
}

const Workout = () => {
  const [state, dispatch] = useReducer(WorkoutReducer, initialWorkoutState);
  const { activeRound, workoutName, completedRoundList, completedDateTime} = state;
  const navigate = useNavigate();

  const apiClient = new APIClient();
  const workoutClient = new WorkoutAPI(apiClient);
  const exerciseClient = new ExerciseAPI(apiClient);

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state._id) {
      workoutClient.updateWorkout(state._id, state);

      if (completedDateTime) {
        navigate('/');
      }
    }
  }, [activeRound, completedDateTime])

  useEffect(() => {
    
  })

  const onFirstLoad = useCallback(async (workoutId?: string) => {
    try {
      setLoading(true);

      if (workoutId) {
        // get workout by ID
        const workout = await workoutClient.getWorkoutById(workoutId);
        dispatch(WorkoutActions.setWorkout(workout));
      } else {
        const newWorkout = await workoutClient.addWorkout(state);
        dispatch(WorkoutActions.setWorkout(newWorkout));
      }

      const exerciseSuggestions = await exerciseClient.getAllExercises();
      setExercises(exerciseSuggestions);

    } catch (err) {
      //handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!state._id) {
      onFirstLoad();
    }
  }, [onFirstLoad, state._id]);

  const onUpdateRepCount = useCallback(
    (
      setIndex: number,
      setItemIndex: number,
      set: Set,
      newRepCount: number | undefined
    ) => {
      dispatch(
        WorkoutActions.updateSet({
          setIndex,
          setItemIndex,
          newSet: { ...set, repCount: newRepCount || 0 },
        })
      );
    },
    []
  );

  const onUpdateWeightValue = useCallback(
    (
      setIndex: number,
      setItemIndex: number,
      set: Set,
      newWeightValue: number | undefined
    ) => {
      dispatch(
        WorkoutActions.updateSet({
          setIndex,
          setItemIndex,
          newSet: { ...set, weightKg: newWeightValue || 0 },
        })
      );
    },
    []
  );

  const onCompleteRound = () => {
    dispatch(WorkoutActions.completeRound());
  };

  const onAddSet = () => {
    dispatch(WorkoutActions.addSet());
  };

  const onAddRound = (roundExercises: Exercise[]) => {
    dispatch(WorkoutActions.addRound({ roundExercises }));
  };

  const onEditRound = (roundIndex: number) => {
    dispatch(WorkoutActions.editRound({ roundIndex }));
  };

  const onCompleteWorkout = () => {
    dispatch(WorkoutActions.completeWorkout());
  }

  return (
    <Container className='gx-2'>
      <h1 className="pt-4">{workoutName}</h1>
      {/* <h5>{workoutType} workout</h5> */}
      {activeRound ? (
        <ActiveRound
          activeRound={activeRound}
          onUpdateRepCount={onUpdateRepCount}
          onUpdateWeightValue={onUpdateWeightValue}
          onCompleteRound={onCompleteRound}
          onAddSet={onAddSet}
        />
      ) : (
        <NewRound exercises={exercises} onAddRound={onAddRound} />
      )}

      {completedRoundList.map((round, roundIndex) => {
        return (
          <PreviousRound
            key={roundIndex}
            round={round}
            index={roundIndex}
            onEditRound={onEditRound}
          ></PreviousRound>
        );
      })}
      <Button className='w-100' variant='outline-primary' onClick={() => onCompleteWorkout()}>Finish</Button>
    </Container>
  );
};

export default Workout;
