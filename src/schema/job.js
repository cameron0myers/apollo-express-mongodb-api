import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    jobs: [Job!]
    job(id: ID!): Job!
  }

  type Job {
    id: ID!
    url: String
    company: String
    createdAt: Date!
    source: String
    platform: String
  }
`;
