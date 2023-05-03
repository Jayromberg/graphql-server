import { RESTDataSource, AugmentedRequest } from '@apollo/datasource-rest';
import type { KeyValueCache } from '@apollo/utils.keyvaluecache';
import { IUser, IUserRes, IRole } from '../../interfaces/IUser';
import { ContextValue } from '../../ContextValue';

export class UsersAPI extends RESTDataSource {
  override baseURL = 'http://localhost:3000/';
  private readonly contextValue: ContextValue;

  constructor (options: { contextValue: ContextValue, cache: KeyValueCache }) {
    super(options);
    this.contextValue = options.contextValue;
  }

  override willSendRequest (_path: string, request: AugmentedRequest): void {
    request.headers.authorization = this.contextValue.token;
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

  async createUser (user: IUser): Promise<IUserRes> {
    const data = await this.get<IUser[]>('users');
    const [role] = await this.get<IRole[]>(`roles?type=${user.role}`);
    const userId = Number(data.length) + 1;

    await this.post('users', { body: {
      id: userId,
      ...user,
      role: role.id
    } });

    return {
      ...user,
      role
    }
  }

  async updateUser (user: IUser): Promise<IUserRes> {
    const [role] = await this.get<IRole[]>(`roles?type=${user.role}`);
    await this.put(`users/${user.id}`, { body: {
      ...user,
      role: role.id
    } })

    return {
      ...user,
      role
    }
  }
};
