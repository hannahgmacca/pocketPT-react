import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import WorkoutReducer, { initialWorkoutState } from './workoutReducer';
import { WorkoutActions } from './workoutActions';
import { Workout } from '../../models/Workout';
import { Set } from '../../models/Set';
import APIClient from '../../apis/APIClient';
import WorkoutAPI from '../../apis/WorkoutAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { Exercise } from '../../models/Exercise';
import ExerciseAPI from '../../apis/ExercisePickerAPI';
import { AppContext } from '../AppContext';

export interface WorkoutHook {
  state: Workout;
  loading: boolean;
  exercises: Exercise[];
  onFirstLoad: () => {};
  onUpdateRepCount: (setIndex: number, setItemIndex: number, set: Set, newRepCount: number | undefined) => void;
  onUpdateWeightValue: (setIndex: number, setItemIndex: number, set: Set, newWeightValue: number | undefined) => void;
  onCompleteRound: () => void;
  onDeleteRound: (roundIndex: number) => void;
  onDeleteSet: (setIndex: number, setItemIndex: number) => void;
  onAddSet: () => void;
  onAddRound: (roundExercises: Exercise[]) => void;
  onEditRound: (roundIndex: number) => void;
  onCompleteWorkout: () => void;
  setWorkout: (workout: Workout) => void;
  setWorkoutName: (workoutName: string) => void;
}

export const useWorkout = (): WorkoutHook => {
  const [state, dispatch] = useReducer(WorkoutReducer, initialWorkoutState);
  const { workoutId } = useParams<{ workoutId: string }>();
  const { setUser, user } = useContext(AppContext);

  const { activeRound, completedDateTime } = state;

  const apiClient = new APIClient();
  const workoutClient = new WorkoutAPI(apiClient);
  const exerciseClient = new ExerciseAPI(apiClient);

  const navigate = useNavigate();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);

  const onFirstLoad = useCallback(async () => {
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
    if (state._id) {
      workoutClient.updateWorkout(state._id, state);

      if (completedDateTime) {
        onCompleteWorkout();
        navigate('/');
      }
    }
  }, [activeRound, completedDateTime]);

  useEffect(() => {
    onFirstLoad();
  }, [onFirstLoad]);

  const onUpdateRepCount = useCallback(
    (setIndex: number, setItemIndex: number, set: Set, newRepCount: number | undefined) => {
      dispatch(
        WorkoutActions.updateSet({
          setIndex,
          setItemIndex,
          newSet: { ...set, repCount: newRepCount || 0 },
        }),
      );
    },
    [],
  );

  const onUpdateWeightValue = useCallback(
    (setIndex: number, setItemIndex: number, set: Set, newWeightValue: number | undefined) => {
      dispatch(
        WorkoutActions.updateSet({
          setIndex,
          setItemIndex,
          newSet: { ...set, weightKg: newWeightValue || 0 },
        }),
      );
    },
    [],
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
    if (user) {
      setUser({
        ...user,
        activeWorkout: null,
      });
    }
  };

  const setWorkout = (workout: Workout) => {
    dispatch(WorkoutActions.setWorkout(workout));
  };

  const setWorkoutName = (workoutName: string) => {
    dispatch(WorkoutActions.setWorkout({ ...state, workoutName }));
  };

  const onDeleteRound = (roundIndex: number) => {
    dispatch(WorkoutActions.deleteRound({ roundIndex }));
  };

  const onDeleteSet = (setIndex: number, setItemIndex: number) => {
    dispatch(WorkoutActions.deleteSet({ setIndex, setItemIndex }));
  };
  return {
    state,
    loading,
    exercises,
    onFirstLoad,
    onUpdateRepCount,
    onUpdateWeightValue,
    onCompleteRound,
    onDeleteRound,
    onDeleteSet,
    onAddSet,
    onAddRound,
    onEditRound,
    onCompleteWorkout,
    setWorkout,
    setWorkoutName,
  };
};
