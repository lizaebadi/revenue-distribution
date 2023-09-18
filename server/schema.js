const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Decimal

  type Movie {
    id: Int
    title: String
    shareholders: [Shareholder]
    transfers: [Transfer]
  }

  type Shareholder {
    id: Int
    firstName: String
    lastName: String
    address: String
    iban: String
    movie: Movie
  }

  type Transfer {
    id: Int
    amount: Decimal
    description: String
    movie: Movie
  }

  input MovieInput {
    title: String!
  }

  input ShareholderInput {
    firstName: String!
    lastName: String!
    address: String!
    iban: String!
    movieId: Int!
  }

  input TransferInput {
    amount: Decimal!
    description: String!
    movieId: Int!
  }

  type Wallet {
    shareholder: Shareholder
    balance: Decimal
    transfers: [Transfer]
  }

  type Query {
    wallet(shareholderID: Int!): Wallet
    movies: [Movie]  
    shareholders: [Shareholder]  
    transfers: [Transfer]
  }

  type Mutation {
    createMovie(data: MovieInput!): Movie
    createShareholder(data: ShareholderInput!): Shareholder
    createTransfer(data: TransferInput!): Transfer
  }
`;

module.exports = typeDefs;
