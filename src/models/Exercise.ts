export interface Exercise {
  _id: string;
  exerciseName: string;
  equipment: equipmentType;
  muscleGroup: muscleGroup;
  isEachSide: boolean;
}

export enum muscleGroup {
  none = 'none',
  bicep = 'bicep',
  tricep = 'tricep',
  calves = 'calves',
  chest = 'chest',
  back = 'back',
  shoulders = 'shoulders',
  quadriceps = 'quadriceps',
  hamstrings = 'hamstrings',
  glutes = 'glutes',
  abs = 'abs',
  forearms = 'forearms',
  traps = 'traps',
  lats = 'lats',
  obliques = 'obliques'
}

export enum equipmentType {
  none = 'none',
  machine = 'machine',
  barbell = 'barbell',
  dumbell = 'dumbell',
  stetchBand = 'stretchBand'
}

export const initalExercise = {
  _id: '',
  exerciseName: '',
  equipment: equipmentType.none,
  muscleGroup: muscleGroup.none,
  isEachSide: false
} as Exercise;