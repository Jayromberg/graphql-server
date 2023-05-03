export const UserSchema = `
  type User {
    nome: String!
    ativo: Boolean!
    email: String
    role: Role!
  }

  type Role {
    id: ID!
    type: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User!
  }

  type Mutation {
    createUser(
      nome: String!
      ativo: Boolean!
      email: String
      role: String!
    ): User!
  }
`;
