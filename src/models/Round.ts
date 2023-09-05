import { Set } from "./Set";
import { SuperSet } from "./SuperSet";

export interface Round {
  setList: Array<Set | SuperSet>;
  Label: string;
}
