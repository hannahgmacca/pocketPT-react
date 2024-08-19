import { Exercise } from '../models/Exercise';
import { ExerciseHistory } from '../models/ExerciseHistory';
import APIClient from './APIClient';

class ExerciseHistoryAPI {
  private client: APIClient;

  constructor(client: APIClient) {
    this.client = client;
  }

  public async getUserExerciseHistory(userId: string, exerciseId: string): Promise<ExerciseHistory|undefined> {
    return await this.client.get(`/exercise-history/${userId}/${exerciseId}`);
  }

  public async getAllUserExerciseHistory(userId: string, exerciseId: string): Promise<Exercise> {
    return await this.client.get(`/exercise-history/${userId}`);
  }
}

export default ExerciseHistoryAPI;
