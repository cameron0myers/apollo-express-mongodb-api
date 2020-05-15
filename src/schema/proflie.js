import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    profiles: [Profile!]
    profile(id: ID!): Profile!
  }

  extend type Mutation {
    createProfile(
      fields: [Field],
      userId: String,
    ): Profile!

    updateProfile(
      id: ID!
      fields: [Field],
    ): Profile!

    deleteProfile(id: ID!): Boolean!
  }

  type Profile {
    fields: [Field!]
    userId: String
    user: User
    applications: [Application!]
  }
`;
