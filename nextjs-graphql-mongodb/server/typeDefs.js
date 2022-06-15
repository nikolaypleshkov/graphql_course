const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    authors: [Author!]!
    books: [Book!]!
  }
  type Author {
    id: ID!
    name: String!
    books: [Book!]
  }
  type Book {
    id: ID!
    name: String!
    pages: Int
    author: Author!
  }
  type Mutation {
    createAuthor(name: String!): Author!
    createBook(name: String!, pages: Int, author: String!): Book!
  }
`;

module.exports = typeDefs;
