export const UserSchema = `
  scalar Date

  type User {
    nome: String!
    ativo: Boolean!
    email: String
    role: Role!
    createdAt: Date
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
      createdAt: Date!
    ): User!
    updateUser(
      id: ID!
      nome: String
      ativo: Boolean
      email: String
      role: String
    ): User!
    deleteUser(id: ID!): ID!
  }
`;
