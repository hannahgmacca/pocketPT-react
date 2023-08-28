import { Round } from "./Round";

export interface Workout {
  workoutId: number;
  workoutName: string;
  workoutType: WorkoutType;
  completedRoundList: Round[];
  activeRound: Round | undefined;
  caloriesBurnt: number;
  isActive?: boolean;
  startedDateTime?: Date;
  completedDateTime?: Date;
}

export interface WorkoutShort {
  workoutId: number;
  workoutName: string;
  workoutType: WorkoutType;
  caloriesBurnt: number;
  completedDateTime?: Date;
}

export enum WorkoutType {
  strength,
  cardio,
  hiit,
}
