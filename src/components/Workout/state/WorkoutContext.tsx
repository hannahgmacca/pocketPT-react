import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import WorkoutReducer, { initialWorkoutState } from './workoutReducer';
import { WorkoutActions } from './workoutActions';
import { Workout } from '../../../models/Workout';
import { Set } from '../../../models/Set';
import APIClient from '../../../apis/APIClient';
import WorkoutAPI from '../../../apis/WorkoutAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { Exercise } from '../../../models/Exercise';
import ExerciseAPI from '../../../apis/ExerciseAPI';
import { AppContext } from '../../../state/AppContext';
import ExerciseHistoryAPI from '../../../apis/ExerciseHistoryAPI';
import { ExerciseHistory } from '../../../models/ExerciseHistory';

const initialWorkoutContext = {
  state: initialWorkoutState as Workout,
  exerciseHistories: {} as Record<string, ExerciseHistory>,
  loading: false as boolean,
  exercises: [] as Exercise[],
  exerciseFilters: [] as number[],
  newExerciseModalOpen: false,
  editExerciseModalOpen: false,
  exerciseHistoryModalOpen: false,
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
  setEditExerciseModalOpen: (_exerciseModalOpen: boolean) => {},
  setExerciseHistoryModalOpen: (_exerciseHistoryModalOpen: boolean) => {},
  setExerciseHistories: (_exerciseHistories: Record<string, ExerciseHistory>) => {},
};

export const WorkoutContext = createContext(initialWorkoutContext);

export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WorkoutReducer, initialWorkoutState);
  const { workoutId } = useParams<{ workoutId: string }>();
  const { setUser, user } = useContext(AppContext);

  const { activeRound, completedRoundList, completedDateTime } = state;

  const apiClient = new APIClient();
  const workoutClient = new WorkoutAPI(apiClient);
  const exerciseClient = new ExerciseAPI(apiClient);
  const exerciseHistoryClient = new ExerciseHistoryAPI(apiClient);

  // exercise data
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // ui state
  const [exerciseFilters, setExerciseFilters] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [newExerciseModalOpen, setNewExerciseModalOpen] = useState(false);
  const [editExerciseModalOpen, setEditExerciseModalOpen] = useState(false);
  const [exerciseHistoryModalOpen, setExerciseHistoryModalOpen] = useState(false);

  // performance data
  const [exerciseHistories, setExerciseHistories] = useState<Record<string, ExerciseHistory>>({});

  const navigate = useNavigate();

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
      alert('There was an issue fetching workout.');
      if (user)
        setUser({
          ...user,
          activeWorkout: null,
        });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (state._id) {
        workoutClient.updateWorkout(state._id, state);
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [activeRound, completedRoundList]);

  useEffect(() => {
    if (state._id && completedDateTime) {
      workoutClient.updateWorkout(state._id, state);
    }
  }, [completedDateTime]);

  useEffect(() => {
    onFirstLoad();
  }, [onFirstLoad]);

  const onUpdateRepCount = useCallback(
    (setIndex: number, setItemIndex: number, set: Set, newRepCount: number | undefined) => {
      onUpdateSet(setIndex, setItemIndex, { ...set, repCount: newRepCount || 0 });
    },
    [],
  );

  const onUpdateWeightValue = useCallback(
    (setIndex: number, setItemIndex: number, set: Set, newWeightValue: number | undefined) => {
      onUpdateSet(setIndex, setItemIndex, { ...set, weightKg: newWeightValue || 0 });
    },
    [],
  );

  const onUpdateSet = (setIndex: number, setItemIndex: number, newSet: Set) => {
    const exerciseHistory = exerciseHistories[newSet.exercise._id];

    dispatch(
      WorkoutActions.updateSet({
        setIndex,
        setItemIndex,
        newSet,
        exerciseHistory
      }),
    );
  };

  const onCompleteRound = () => {
    dispatch(WorkoutActions.completeRound());
  };

  const onAddSet = () => {
    dispatch(WorkoutActions.addSet());
  };

  const onAddRound = (roundExercises: Exercise[]) => {
    dispatch(WorkoutActions.addRound({ roundExercises }));
    fetchExerciseHistories(roundExercises);
  };

  const onEditRound = async (roundIndex: number) => {
    const newActiveRoundExercises = completedRoundList.find((round, index) => index === roundIndex)?.setList[0].map(set => set.exercise);

    if (newActiveRoundExercises) {
      await fetchExerciseHistories(newActiveRoundExercises);
    }
    
    dispatch(WorkoutActions.editRound({ roundIndex }));
  };

  const onUpdateRoundExercise = async (oldExercise: Exercise, newExercise: Exercise) => {
    if (!user) return;

    if (oldExercise._id != newExercise._id) {
      const newExerciseHistory = await exerciseHistoryClient.getUserExerciseHistory(user._id, newExercise._id);

      // previous exercise had history
      delete exerciseHistories[oldExercise._id];

      // add new exercise history
      if (newExerciseHistory) {
        exerciseHistories[newExercise._id] = newExerciseHistory;
      }
    }

    dispatch(WorkoutActions.updateRoundExercises({ oldExercise, newExercise }));
  };

  const onCompleteWorkout = async () => {
    dispatch(WorkoutActions.completeWorkout());
    await workoutClient.updateWorkout(state._id, state);
    if (user) {
      setUser({
        ...user,
        activeWorkout: null,
      });
    }

    navigate('/');
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
    if (!exercise.exerciseName || !user) return;

    try {
      exercise.userId = user._id;
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

  const fetchExerciseHistories = async (roundExercises: Exercise[]) => {
    if (!user) return;
    try {
      const exerciseHistories: Record<string, ExerciseHistory> = {};

      await Promise.all(
        roundExercises.map(async (exercise) => {
          const result = await exerciseHistoryClient.getUserExerciseHistory(user._id, exercise._id);
          if (result) {
            exerciseHistories[exercise._id] = result;
          }
        }),
      );

      setExerciseHistories(exerciseHistories);
    } catch {
      alert('There was an issue fetching exercise history data.');
    }
  };

  // const getCurrentExerciseIds = () => {
  //   return activeRound?.setList.flat().map(set => set.exercise) || [];
  // };

  return (
    <WorkoutContext.Provider
      value={{
        state,
        loading,
        exercises,
        exerciseFilters,
        newExerciseModalOpen,
        editExerciseModalOpen,
        exerciseHistories,
        exerciseHistoryModalOpen,
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
        setEditExerciseModalOpen,
        setExerciseHistoryModalOpen,
        setExerciseHistories,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
