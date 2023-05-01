export const UserSchema = `
  type User {
    nome: String!
    ativo: Boolean!
    email: String
  }

  type Query {
    users: [User]
    user(id: ID!): User!
  }
`;
