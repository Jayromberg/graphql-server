export interface IUser {
  id?: number
  nome: string
  ativo: boolean
  email: string
  role: number | string
  createdAt?: Date
};

export interface IRole {
  id: number
  type: string
}

export interface IUserRes {
  id?: number
  nome: string
  ativo: boolean
  email: string
  role: IRole
};
