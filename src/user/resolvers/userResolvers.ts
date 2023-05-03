export const userResolvers = {
  Query: {
    users: async (_, __, { dataSources }) => {
      return dataSources.usersAPI.getUsers();
    },
    user: async (_, { id }, { dataSources }) => {
      return dataSources.usersAPI.getUserById(id);
    }
  },
  Mutation: {
    createUser: async (_, { nome, ativo, email, role }, { dataSources }) => {
      return dataSources.usersAPI.createUser({ nome, ativo, email, role });
    },
    updateUser: async (_, { id, nome, ativo, email, role }, { dataSources }) => {
      return dataSources.usersAPI.updateUser({ id, nome, ativo, email, role });
    }
  }
}
