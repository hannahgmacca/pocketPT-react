import {
  ActionNames,
  ActionsUnion,
  createAction,
} from "../../../hooks-store/action-factory";
import { Set } from "../../../models/Set";
import { Exercise } from "../../../models/Exercise";
import { Workout } from "../../../models/Workout";

export enum WorkoutActionList {
  ADD_SET = "ADD_SET",
  ADD_ROUND = "ADD_ROUND",
  COMPLETE_ROUND = "COMPLETE_ROUND",
  UPDATE_SET = "UPDATE_SET",
  SET_WORKOUT = "SET_WORKOUT",
  EDIT_ROUND = "EDIT_ROUND",
}

export type WorkoutActionNames = ActionNames<typeof WorkoutActionList>;

export const WorkoutActions = {
  addRound: (payload: { roundExercises: Exercise[] }) =>
    createAction(WorkoutActionList.ADD_ROUND, payload),

  addSet: () => createAction(WorkoutActionList.ADD_SET),

  updateSet: (payload: {
    setIndex: number;
    setItemIndex: number;
    newSet: Set;
  }) => createAction(WorkoutActionList.UPDATE_SET, payload),

  setWorkout: (payload: Workout) =>
    createAction(WorkoutActionList.SET_WORKOUT, payload),

  completeRound: () => createAction(WorkoutActionList.COMPLETE_ROUND),

  editRound: (payload: { roundIndex: number }) =>
    createAction(WorkoutActionList.EDIT_ROUND, payload),
};

export type WorkoutActionsUnion = ActionsUnion<typeof WorkoutActions>;

export type WorkoutAction<ActionName> = Extract<
  WorkoutActionsUnion,
  { type: ActionName }
>;
