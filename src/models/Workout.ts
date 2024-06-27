import { Round } from "./Round";

export interface Workout {
  _id: string;
  userId: string;
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
  _id: number;
  workoutName: string;
  workoutType: WorkoutType;
  caloriesBurnt: number;
  completedDateTime?: Date;
}

export enum WorkoutType {
  strength = 'strength',
  cardio = 'cardio',
  hiit = 'hiit',
}

