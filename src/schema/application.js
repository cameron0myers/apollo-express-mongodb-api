import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    application(id: ID!): Application!
    applications: [Application!]
  }

  extend type Mutation {
    createApplication(fields: [FieldInput!]!, jobId: String!): Application!
  }

  extend type Subscription {
    applicationCreated: ApplicationCreated!
  }

  type ApplicationCreated {
    application: Application!
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
`;
