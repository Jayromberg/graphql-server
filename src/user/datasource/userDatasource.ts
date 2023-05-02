import { RESTDataSource } from '@apollo/datasource-rest';
import IUser from '../../interfaces/IUsers';

export class UsersAPI extends RESTDataSource {
  override baseURL = 'http://localhost:3000/';

  async getUsers (): Promise<IUser[]> {
    const data = await this.get('users');
    const roles = await this.get('roles');

    const users = data.map((user: IUser) => ({
      ...user,
      role: roles.find((role: { id: number, type: string }) => role.id === user.role)
    }))

    return users;
  }

  async getUserById (id: string): Promise<IUser> {
    return await this.get<IUser>(`users/${encodeURIComponent(id)}`);
  }
};
