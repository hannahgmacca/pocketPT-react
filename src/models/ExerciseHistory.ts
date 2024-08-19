import { Exercise } from './Exercise';
import { IsBestEffortLoad, PerformanceLoad, PersonalBestRounds } from './Load';
import { Round } from './Round';

export interface ExerciseHistory {
  _id: string;
  userId: string;
  exerciseId: string;
  exercise: Exercise;
  personalBest: PerformanceLoad;
  personalBestRounds: PersonalBestRounds;
  roundList: RoundHistoricalItem[];
}

export interface RoundHistoricalItem {
  workoutId: string;
  round: Round;
  bestEffort: PerformanceLoad;
  wasPersonalBest: IsBestEffortLoad;
  completedDateTime: Date;
}