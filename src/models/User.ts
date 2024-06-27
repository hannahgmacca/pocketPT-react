import { Workout } from './Workout';

export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  activeWorkout: Workout | null
}

export default User;
