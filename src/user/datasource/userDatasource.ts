import { RESTDataSource } from '@apollo/datasource-rest';
import { IUser, IUserRes, IRole } from '../../interfaces/IUser';

export class UsersAPI extends RESTDataSource {
  override baseURL = 'http://localhost:3000/';

  async getUsers (): Promise<IUserRes[]> {
    const data = await this.get<IUser[]>('users');

    const users = data.map(async (user: IUser) => ({
      ...user,
      role: await this.get<IRole>(`roles/${encodeURIComponent(user.role)}`)
    })) as unknown as IUserRes[];

    return users;
  }

  async getUserById (id: number | string): Promise<IUserRes> {
    const data = await this.get<IUser>(`users/${encodeURIComponent(id)}`);
    const role = await this.get<IRole>(`roles/${encodeURIComponent(data.role)}`);

    return {
      ...data,
      role
    };
  }

  async createUser (user: IUser): Promise<IUser> {
    const data = await this.get<IUser[]>('users');
    const [roleData] = await this.get<IRole[]>(`roles?type=${user.role}`);
    const userId = Number(data.length) + 1;

    return await this.post<IUser>('users', {
      id: userId,
      ...user,
      role: roleData.id
    })
  }
};
