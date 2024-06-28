export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  activeWorkout: string | null
}

export default User;
