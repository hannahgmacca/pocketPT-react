import { Handlers, createReducer } from "../../../hooks-store/action-factory";
import { Exercise } from "../../../models/Exercise";
import { Round } from "../../../models/Round";
import { Set } from "../../../models/Set";
import { Workout, WorkoutType } from "../../../models/Workout";
import {
  WorkoutAction,
  WorkoutActionList,
  WorkoutActionNames,
  WorkoutActionsUnion,
} from "./workoutActions";

export const initialWorkoutState = {
  workoutId: 0,
  workoutName: "",
  workoutType: WorkoutType.strength,
  isActive: true,
  completedRoundList: [] as Round[],
  activeRound: undefined as Round | undefined,
  caloriesBurnt: 0,
  startedDatedTime: undefined as Date | undefined,
  completedDatedTime: undefined as Date | undefined,
};

const WorkoutHandlers: Handlers<WorkoutActionNames, Workout> = {
  [WorkoutActionList.ADD_ROUND]: (state, action) => {
    const exercises: Exercise[] | undefined =
      action.payload.roundExercises ?? undefined;

    if (!exercises) {
      return {
        ...state,
      };
    }

    const setList: Set[] = exercises.map((e) => {
      return {
        exercise: e,
        repCount: e.defaultRepCount,
        weightKg: e.defaultWeight,
      };
    });

    return {
      ...state,
      activeRound: {
        exerciseCount: exercises.length,
        setList: setList,
      },
    };
  },

  [WorkoutActionList.ADD_SET]: (
    state,
    action: WorkoutAction<WorkoutActionList.ADD_SET>
  ) => {
    if (!state.activeRound) return { ...state };
    const { newExercise } = action.payload;
    const { activeRound } = state;

    // set rep count
    const repCount =
      activeRound.setList.length > 1
        ? activeRound.setList[activeRound.setList.length - 1].repCount
        : newExercise.defaultRepCount;

    // set default weight
    const weightKg =
      activeRound.setList.length > 1
        ? activeRound.setList[activeRound.setList.length - 1].weightKg
        : newExercise.defaultWeight;

    return {
      ...state,
      activeRound: {
        ...activeRound,
        setList: [
          ...activeRound.setList,
          {
            exercise: newExercise,
            repCount: repCount,
            weightKg: weightKg,
          },
        ],
      },
    };
  },

  [WorkoutActionList.UPDATE_SET]: (
    state,
    action: WorkoutAction<WorkoutActionList.UPDATE_SET>
  ) => {
    if (!state.activeRound) return { ...state };
    const { setIndex, newSet } = action.payload;

    const updatedSets = state.activeRound.setList.map((set, setIdx) => {
      if (setIdx === setIndex) {
        return newSet;
      }
      return set;
    });

    return {
      ...state,
      activeRound: {
        ...state.activeRound,
        setList: updatedSets,
      },
    };
  },

  //TODO
  [WorkoutActionList.SET_WORKOUT]: (
    state,
    action: WorkoutAction<WorkoutActionList.SET_WORKOUT>
  ) => {
    return {
      ...action.payload,
    };
  },

  [WorkoutActionList.COMPLETE_ROUND]: (state) => {
    const { activeRound } = state;
    if (!activeRound) return { ...state };

    return {
      ...state,
      activeRound: undefined,
      completedRoundList: [...state.completedRoundList, activeRound],
    };
  },
};

type WorkoutHandlers = typeof WorkoutHandlers;

export default createReducer<Workout, WorkoutHandlers, WorkoutActionsUnion>(
  initialWorkoutState,
  WorkoutHandlers
);
