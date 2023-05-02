export const userResolvers = {
  Query: {
    users: async (_, __, { dataSources }) => {
      return dataSources.usersAPI.getUsers();
    },
    user: async (_, { id }, { dataSources }) => {
      return dataSources.usersAPI.getUserById(id);
    }
  }
}
