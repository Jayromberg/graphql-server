import { UsersAPI } from '../user'

export default interface IMyContext {
  token?: string
  dataSources: {
    usersAPI: UsersAPI
  }
}
