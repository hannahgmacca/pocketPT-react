import { devNull } from 'os';
import { Handlers, createReducer } from '../../hooks-store/action-factory';
import { Exercise } from '../../models/Exercise';
import { Round, RoundSetType } from '../../models/Round';
import { Set } from '../../models/Set';
import { Workout, WorkoutType } from '../../models/Workout';
import { WorkoutAction, WorkoutActionList, WorkoutActionNames, WorkoutActionsUnion } from './workoutActions';

export const initialWorkoutState = {
  _id: '',
  userId: '',
  workoutName: '',
  workoutType: WorkoutType.strength,
  isActive: true,
  completedRoundList: [] as Round[],
  activeRound: null as Round | null,
  caloriesBurnt: 0,
  startedDatedTime: undefined as Date | undefined,
  completedDatedTime: undefined as Date | undefined,
};

const WorkoutHandlers: Handlers<WorkoutActionNames, Workout> = {
  [WorkoutActionList.ADD_ROUND]: (state, action) => {
    const exercises: Exercise[] | undefined = action.payload.roundExercises ?? undefined;

    if (!exercises) {
      return {
        ...state,
      };
    }

    const setItem: Set[] = exercises.map((e) => {
      return {
        exercise: e,
        repCount: 0,
        weightKg: 0,
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

  [WorkoutActionList.ADD_SET]: (state, action: WorkoutAction<WorkoutActionList.ADD_SET>) => {
    if (!state.activeRound) return { ...state };
    const { activeRound } = state;

    console.log(activeRound);

    const newSetGroup: Set[] = [
      ...activeRound.setList[activeRound.setList.length - 1].map((setItem) => {
        // set default rep count from previous set
        const repCount = activeRound.setList.length > 1 ? setItem.repCount : 0;

        // set default weight from previous set
        const weightKg = activeRound.setList.length > 1 ? setItem.weightKg : 0;

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

  [WorkoutActionList.UPDATE_SET]: (state, action: WorkoutAction<WorkoutActionList.UPDATE_SET>) => {
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
  [WorkoutActionList.SET_WORKOUT]: (state, action: WorkoutAction<WorkoutActionList.SET_WORKOUT>) => {
    return {
      ...action.payload,
    };
  },

  [WorkoutActionList.COMPLETE_ROUND]: (state) => {
    const { activeRound } = state;
    if (!activeRound) return { ...state };

    return {
      ...state,
      activeRound: null,
      completedRoundList: [...state.completedRoundList, activeRound],
    };
  },

  [WorkoutActionList.EDIT_ROUND]: (state, action: WorkoutAction<WorkoutActionList.EDIT_ROUND>) => {
    const { activeRound, completedRoundList } = state;
    const { roundIndex } = action.payload;

    // find new active round
    const newActiveRound = completedRoundList.find((round, index) => index === roundIndex) || null;

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

  [WorkoutActionList.UPDATE_ROUND_EXERCISES]: (state, action: WorkoutAction<WorkoutActionList.UPDATE_ROUND_EXERCISES>) => {
    const { activeRound } = state;
    const { oldExercise, newExercise } = action.payload;

    const newActiveRound = activeRound;
    newActiveRound?.setList.forEach(set => set.forEach(set => {
      if (set.exercise._id == oldExercise._id) {
        set.exercise = newExercise;
      }
    }))

    return {
      ...state,
      activeRound: newActiveRound,
    };
  },

  [WorkoutActionList.DELETE_ROUND]: (state, action: WorkoutAction<WorkoutActionList.DELETE_ROUND>) => {
    const { activeRound, completedRoundList } = state;
    const { roundIndex } = action.payload;

    let newActiveRound = activeRound;
    const newCompletedRoundList = [...completedRoundList];

    if (roundIndex < 0) {
      newActiveRound = null;
    } else {
      // remove round from completed rounds
      newCompletedRoundList.splice(roundIndex, 1);
    }

    return {
      ...state,
      activeRound: newActiveRound,
      completedRoundList: [...newCompletedRoundList],
    };
  },

  [WorkoutActionList.DELETE_SET]: (state, action: WorkoutAction<WorkoutActionList.DELETE_SET>) => {
    const { setIndex, setItemIndex } = action.payload;
    const { activeRound } = state;

    if (!activeRound || (activeRound.setList.length == 1 && activeRound.setList[0].length == 1)) return { ...state };

    // Create a deep copy of the activeRound's setList
    let newSetList = activeRound.setList.map((sets, index) => {
      if (index === setIndex) {
        // Filter out the set item
        return sets.filter((_, itemIndex) => itemIndex !== setItemIndex);
      }
      return sets;
    });

    // Filter out any empty arrays
    newSetList = newSetList.filter((sets) => sets.length > 0);

    // Update the activeRound with the new setList
    const newActiveRound = {
      ...activeRound,
      setList: newSetList,
    };

    return {
      ...state,
      activeRound: newActiveRound,
    };
  },

  [WorkoutActionList.COMPLETE_WORKOUT]: (state) => {
    const { activeRound } = state;

    const completedRoundList = activeRound ? [...state.completedRoundList, activeRound] : [...state.completedRoundList];

    return {
      ...state,
      activeRound: null,
      isActive: false,
      completedDateTime: state.completedDateTime || new Date(),
      completedRoundList,
    };
  },
};

type WorkoutHandlers = typeof WorkoutHandlers;

export default createReducer<Workout, WorkoutHandlers, WorkoutActionsUnion>(initialWorkoutState, WorkoutHandlers);
