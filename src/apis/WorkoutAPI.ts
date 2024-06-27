import { Workout, WorkoutShort } from '../models/Workout';
import APIClient from './APIClient';

class WorkoutAPI {
  private client: APIClient;

  constructor(client: APIClient) {
    this.client = client;
  }

  public async getAllWorkouts(): Promise<WorkoutShort[]> {
    return await this.client.get('/workout');
  }

  public async getWorkoutById(id: string): Promise<Workout> {
    return await this.client.get(`/workout/${id}`);
  }

  public async addWorkout(workout: Workout): Promise<Workout> {
    return await this.client.post('/workout', workout);
  }

  public async updateWorkout(id: string, workout: any) {
    return await this.client.patch(`/workout/${id}`, workout);
  }

  public async deleteWorkout(id: string) {
    return await this.client.delete(`/workout/${id}`);
  }
}

export default WorkoutAPI;
