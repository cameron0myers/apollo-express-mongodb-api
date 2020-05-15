import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    applications: [Application!]
    application(id: ID!): Application!
  }

  extend type Mutation {
    createProfile(
      fields: [Field],
      jobId: String,
      userId: String,
    ): Application!
  }

  type Application {
    fields: [Field!]
    createdAt: Date!
    userId: String
    jobId: String
    job: Job
    user: User
  }

  type Job {
    url: type: String
    company: type: String
    createdAt: Date!
    source: type: String
    platform: type: String
  }
`;
