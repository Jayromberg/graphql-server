import { RESTDataSource } from '@apollo/datasource-rest';
import IUsers from '../../interfaces/IUsers';

export class UsersAPI extends RESTDataSource {
  override baseURL = 'http://localhost:3000';

  // async getMovie(id: string): Promise<Movie> {
  //   return this.get<Movie>(`movies/${encodeURIComponent(id)}`);
  // }

  async getUsers (): Promise<IUsers[]> {
    const data = await this.get('/users');
    return data;
  }
};
