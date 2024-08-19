import { ActionNames, ActionsUnion, createAction } from '../../../hooks-store/action-factory';
import { Set } from '../../../models/Set';
import { Exercise } from '../../../models/Exercise';
import { Workout } from '../../../models/Workout';
import { ExerciseHistory } from '../../../models/ExerciseHistory';

export enum WorkoutActionList {
  ADD_SET = 'ADD_SET',
  ADD_ROUND = 'ADD_ROUND',
  COMPLETE_ROUND = 'COMPLETE_ROUND',
  UPDATE_SET = 'UPDATE_SET',
  SET_WORKOUT = 'SET_WORKOUT',
  EDIT_ROUND = 'EDIT_ROUND',
  UPDATE_ROUND_EXERCISES = 'UPDATE_ROUND_EXERCISES',
  DELETE_ROUND = 'DELETE_ROUND',
  DELETE_SET = 'DELETE_SET',
  COMPLETE_WORKOUT = 'COMPLETE_WORKOUT',
}

export type WorkoutActionNames = ActionNames<typeof WorkoutActionList>;

export const WorkoutActions = {
  addRound: (payload: { roundExercises: Exercise[] }) => createAction(WorkoutActionList.ADD_ROUND, payload),

  addSet: () => createAction(WorkoutActionList.ADD_SET),

  updateSet: (payload: { setIndex: number; setItemIndex: number; newSet: Set, exerciseHistory: ExerciseHistory | null }) =>
    createAction(WorkoutActionList.UPDATE_SET, payload),

  setWorkout: (payload: Workout) => createAction(WorkoutActionList.SET_WORKOUT, payload),

  completeRound: () => createAction(WorkoutActionList.COMPLETE_ROUND),

  editRound: (payload: { roundIndex: number }) => createAction(WorkoutActionList.EDIT_ROUND, payload),

  updateRoundExercises: (payload: { oldExercise: Exercise, newExercise: Exercise }) => createAction(WorkoutActionList.UPDATE_ROUND_EXERCISES, payload),

  deleteRound: (payload: { roundIndex: number }) => createAction(WorkoutActionList.DELETE_ROUND, payload),

  deleteSet: (payload: { setIndex: number; setItemIndex: number }) =>
    createAction(WorkoutActionList.DELETE_SET, payload),

  completeWorkout: () => createAction(WorkoutActionList.COMPLETE_WORKOUT),
};

export type WorkoutActionsUnion = ActionsUnion<typeof WorkoutActions>;

export type WorkoutAction<ActionName> = Extract<WorkoutActionsUnion, { type: ActionName }>;
