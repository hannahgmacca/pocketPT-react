import { Round } from './Round';

export type PersonalBestRounds = LoadTypes<Round>;
export type PerformanceLoad = LoadTypes<number>;
export type IsBestEffortLoad = LoadTypes<boolean>;
export type LoadTypes<T> = { weightKg: T; volumeKg: T };
