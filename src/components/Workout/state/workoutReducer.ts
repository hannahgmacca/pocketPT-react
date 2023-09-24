import { Handlers, createReducer } from "../../../hooks-store/action-factory";
import { Exercise } from "../../../models/Exercise";
import { Round, RoundSetType } from "../../../models/Round";
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

    const setItem: Set[] = exercises.map((e) => {
      return {
        exercise: e,
        repCount: e.defaultRepCount,
        weightKg: e.defaultWeight,
      };
    });

    const setGroup: Set[][] = [setItem];

    let roundSetType: RoundSetType;
    switch (exercises.length) {
      case 1:
        roundSetType = RoundSetType.singleSet;
        break;
      case 2:
        roundSetType = RoundSetType.superSet;
        break;
      case 3:
        roundSetType = RoundSetType.triSet;
        break;
      default:
        roundSetType = RoundSetType.giantSet;
        break;
    }

    return {
      ...state,
      activeRound: {
        setList: setGroup,
        roundSetType: roundSetType,
      },
    };
  },

  [WorkoutActionList.ADD_SET]: (
    state,
    action: WorkoutAction<WorkoutActionList.ADD_SET>
  ) => {
    if (!state.activeRound) return { ...state };
    const { activeRound } = state;

    const newSetGroup: Set[] = [
      ...activeRound.setList[activeRound.setList.length - 1].map((setItem) => {
        // set default rep count from previous set
        const repCount =
          activeRound.setList.length > 1
            ? setItem.repCount
            : setItem.exercise.defaultRepCount;

        // set default weight from previous set
        const weightKg =
          activeRound.setList.length > 1
            ? setItem.weightKg
            : setItem.exercise.defaultRepCount;

        return {
          exercise: setItem.exercise,
          repCount: repCount,
          weightKg: weightKg,
        };
      }),
    ];

    return {
      ...state,
      activeRound: {
        ...activeRound,
        setList: [...activeRound.setList, newSetGroup],
      },
    };
  },

  [WorkoutActionList.UPDATE_SET]: (
    state,
    action: WorkoutAction<WorkoutActionList.UPDATE_SET>
  ) => {
    if (!state.activeRound) return { ...state };
    const { setIndex, setItemIndex, newSet } = action.payload;

    const updatedSets = state.activeRound.setList.map((setGroup, stIndex) => {
      if (stIndex === setIndex) {
        const updatedSetItems = setGroup.map((setItem, stItemIndex) => {
          if (stItemIndex === setItemIndex) {
            return newSet;
          }
          return setItem;
        });
        return updatedSetItems;
      }
      return setGroup;
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

  [WorkoutActionList.EDIT_ROUND]: (
    state,
    action: WorkoutAction<WorkoutActionList.EDIT_ROUND>
  ) => {
    const { activeRound, completedRoundList } = state;
    const { roundIndex } = action.payload;

    // find new active round
    const newActiveRound = completedRoundList.find(
      (round, index) => index === roundIndex
    );

    // remove new active round from completed rounds
    const newCompletedRoundList = [...completedRoundList];
    newCompletedRoundList.splice(roundIndex, 1);

    // add old active round to completed rounds
    if (activeRound) newCompletedRoundList.push(activeRound);

    return {
      ...state,
      activeRound: newActiveRound,
      completedRoundList: [...newCompletedRoundList],
    };
  },
};

type WorkoutHandlers = typeof WorkoutHandlers;

export default createReducer<Workout, WorkoutHandlers, WorkoutActionsUnion>(
  initialWorkoutState,
  WorkoutHandlers
);
