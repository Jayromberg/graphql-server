import { RESTDataSource } from '@apollo/datasource-rest';
import IUser from '../../interfaces/IUsers';

export class UsersAPI extends RESTDataSource {
  override baseURL = 'http://localhost:3000/';

  async getUsers (): Promise<IUser[]> {
    const data = await this.get('users');

    const users = data.map(async (user: IUser) => ({
      ...user,
      role: await this.get(`roles/${encodeURIComponent(user.role)}`)
    }))

    return users;
  }

  async getUserById (id: string): Promise<IUser> {
    const data = await this.get<IUser>(`users/${encodeURIComponent(id)}`);
    data.role = await this.get(`roles/${encodeURIComponent(data.role)}`);

    return data;
  }
};
