import { UsersAPI } from '../user'

export default interface IMyContext {
  token?: string
  ataSources: {
    usersAPI: UsersAPI
  }
}
