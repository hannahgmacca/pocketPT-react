import { Set } from "./Set";

export interface Round {
  setList: Set[][];
  roundSetType: RoundSetType;
}

export enum RoundSetType {
  singleSet = "Single Set",
  superSet = "Super Set",
  triSet = "Tri Set",
  giantSet = "Giant Set",
  hiitSet = "HIIT Set",
}
