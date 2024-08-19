import { Exercise } from "./Exercise";
import { IsBestEffortLoad } from './Load';

export interface Set {
  exercise: Exercise;
  repCount: number;
  weightKg: number;
  totalVolumeKg: number;
  isPersonalBest: IsBestEffortLoad;
}

export const GetSetVolume = (set: Set) => ((set.repCount || 0) * (set.totalVolumeKg || 0));