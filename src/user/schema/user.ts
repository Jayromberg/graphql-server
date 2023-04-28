const UserSchema = `
  type User {
    nome: String!
    ativo: Boolean!
    email: String
  }

  type Query {
    users: [User!]!
  }
`;

export default UserSchema;
