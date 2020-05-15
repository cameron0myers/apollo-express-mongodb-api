import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    application(id: ID!): Application!
  }

  extend type Mutation {
    createApplication(fields: [FieldInput!]!, jobId: String!): Application!
  }

  type Application {
    id: ID!
    fields: [Field]
    createdAt: Date
    userId: String
    jobId: String
    job: Job
    user: User
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
