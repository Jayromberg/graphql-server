import { buildSchema } from 'graphql';

export const UserSchema = buildSchema(`
  type User {
    nome: String!
    ativo: Boolean!
    email: String
  }

  type Query {
    users: [User]
  }
`);
