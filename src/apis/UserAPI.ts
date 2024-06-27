import User from '../models/User';
import APIClient from './APIClient';

class UserAPI {
  private client: APIClient;

  constructor(client: APIClient) {
    this.client = client;
  }

  public async getUser(): Promise<User> {
    return await this.client.get('/user/me');
  }
  
}

export default UserAPI;
