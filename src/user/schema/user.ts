export const UserSchema = `
  scalar Date

  enum RolesType {
    ESTUDANTE
    DOCENTE
    COORDENACAO
  }

  type Role {
    id: ID!
    type: RolesType!
  }

  type User {
    nome: String!
    ativo: Boolean!
    email: String
    role: Role!
    createdAt: Date
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
      role: RolesType!
      createdAt: Date!
    ): User!
    updateUser(
      id: ID!
      nome: String
      ativo: Boolean
      email: String
      role: RolesType
    ): User!
    deleteUser(id: ID!): ID!
  }
`;
