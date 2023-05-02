import { RESTDataSource, AugmentedRequest } from '@apollo/datasource-rest';
import type { KeyValueCache } from '@apollo/utils.keyvaluecache';
import { IUser, IUserRes, IRole } from '../../interfaces/IUser';

export class UsersAPI extends RESTDataSource {
  override baseURL = 'http://localhost:3000/';
  private readonly token: string;

  constructor (options: { token: string, cache: KeyValueCache }) {
    super(options);
    this.token = options.token;
  }

  override willSendRequest (_path: string, request: AugmentedRequest): void {
    request.headers.authorization = this.token;
  }

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

    const newData = {
      id: userId,
      ...user,
      role: roleData.id
    }

    await this.post('users', { body: newData });

    return newData;
  }
};
