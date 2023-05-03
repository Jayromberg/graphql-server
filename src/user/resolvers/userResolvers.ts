import dateScalar from '../customScalars/dateScalar';

export const userResolvers = {
  Date: dateScalar,
  Query: {
    users: async (_, __, { dataSources }) => {
      return dataSources.usersAPI.getUsers();
    },
    user: async (_, { id }, { dataSources }) => {
      return dataSources.usersAPI.getUserById(id);
    }
  },
  Mutation: {
    createUser: async (_, { nome, ativo, email, role, createdAt }, { dataSources }) => {
      return dataSources.usersAPI.createUser({ nome, ativo, email, role, createdAt });
    },
    updateUser: async (_, { id, nome, ativo, email, role }, { dataSources }) => {
      return dataSources.usersAPI.updateUser({ id, nome, ativo, email, role });
    },
    deleteUser: async (_, { id }, { dataSources }) => {
      return dataSources.usersAPI.deleteUser(id);
    }
  }
}
