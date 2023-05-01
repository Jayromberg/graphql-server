export const userResolvers = {
  Query: {
    users: async (_, __, { dataSources }) => {
      return dataSources.usersAPI.getUsers();
    }
  }
}
