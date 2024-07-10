import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import WorkoutReducer, { initialWorkoutState } from './workoutReducer';
import { WorkoutActions } from './workoutActions';
import { Workout, WorkoutType } from '../../models/Workout';
import { Set } from '../../models/Set';
import APIClient from '../../apis/APIClient';
import WorkoutAPI from '../../apis/WorkoutAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { Exercise } from '../../models/Exercise';
import ExerciseAPI from '../../apis/ExerciseAPI';
import { AppContext } from '../AppContext';

const initialWorkoutContext = {
  state: initialWorkoutState as Workout,
  loading: false as boolean,
  exercises: [] as Exercise[],
  exerciseFilters: [] as number[],
  newExerciseModalOpen: false,
  onFirstLoad: () => {},
  onUpdateRepCount: (_setIndex: number, _setItemIndex: number, _set: Set, _newRepCount: number | undefined) => {},
  onUpdateWeightValue: (_setIndex: number, _setItemIndex: number, _set: Set, _newWeightValue: number | undefined) => {},
  onCompleteRound: () => {},
  onDeleteRound: (_roundIndex: number) => {},
  onDeleteSet: (_setIndex: number, setItemIndex: number) => {},
  onAddSet: () => {},
  onAddRound: (_roundExercises: Exercise[]) => {},
  onEditRound: (_roundIndex: number) => {},
  onUpdateRoundExercise: (oldExercise: Exercise, newExercise: Exercise) => {},
  onCompleteWorkout: () => {},
  setWorkout: (_workout: Workout) => {},
  setWorkoutName: (_workoutName: string) => {},
  handleAddExercise: (_exercise: Exercise) => {},
  setExerciseFilters: (_exerciseFilters: number[]) => {},
  setNewExerciseModalOpen: (_exerciseModalOpen: boolean) => {},
};

export const WorkoutContext = createContext(initialWorkoutContext);

export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WorkoutReducer, initialWorkoutState);
  const { workoutId } = useParams<{ workoutId: string }>();
  const { setUser, user } = useContext(AppContext);

  const { activeRound, completedDateTime } = state;

  const apiClient = new APIClient();
  const workoutClient = new WorkoutAPI(apiClient);
  const exerciseClient = new ExerciseAPI(apiClient);

  const navigate = useNavigate();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseFilters, setExerciseFilters] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [newExerciseModalOpen, setNewExerciseModalOpen] = useState(false);

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

      await fetchExercises();
    } catch (err) {
      alert('There was an issue fetching exercises.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (completedDateTime) {
      onCompleteWorkout();
      navigate('/');
    }

   const timeoutId = setTimeout(() => {
      if (state._id) {
        workoutClient.updateWorkout(state._id, state);
      }
    }, 10000);

    return () => clearTimeout(timeoutId);
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

  const onUpdateRoundExercise = (oldExercise: Exercise, newExercise: Exercise) => {
    dispatch(WorkoutActions.updateRoundExercises({ oldExercise, newExercise }));
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

  const handleAddExercise = async (exercise: Exercise) => {
    if (!exercise.exerciseName) return;

    try {
      await exerciseClient.addExercise(exercise);
      setNewExerciseModalOpen(false);
      await fetchExercises();
    } catch {
      alert('There was an issue adding that exercise');
    }
  };

  const fetchExercises = async () => {
    const exerciseSuggestions = await exerciseClient.getAllExercises();
    setExercises(exerciseSuggestions);
  };

  return (
    <WorkoutContext.Provider
      value={{
        state,
        loading,
        exercises,
        exerciseFilters,
        newExerciseModalOpen,
        onFirstLoad,
        onUpdateRepCount,
        onUpdateWeightValue,
        onCompleteRound,
        onDeleteRound,
        onDeleteSet,
        onAddSet,
        onAddRound,
        onEditRound,
        onUpdateRoundExercise,
        onCompleteWorkout,
        setWorkout,
        setWorkoutName,
        handleAddExercise,
        setExerciseFilters,
        setNewExerciseModalOpen,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
