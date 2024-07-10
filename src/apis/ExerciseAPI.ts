import { Exercise } from '../models/Exercise';
import APIClient from './APIClient';

class ExerciseAPI {
  private client: APIClient;

  constructor(client: APIClient) {
    this.client = client;
  }

  public async getAllExercises(): Promise<Exercise[]> {
    return await this.client.get('/exercise');
  }

  // public async getWorkoutById(id: string): Promise<Workout> {
  //   return await this.client.get(`/workout/${id}`);
  // }

  public async addExercise(exercise: Exercise): Promise<Exercise> {
    return await this.client.post('/exercise', [exercise]);
  }

  // public async updateWorkout(id: string, workout: any) {
  //   return await this.client.patch(`/workout/${id}`, workout);
  // }

  // public async deleteWorkout(id: string) {
  //   return await this.client.delete(`/workout/${id}`);
  // }
}

export default ExerciseAPI;
