import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    profile(id: ID!): Profile!
  }

  extend type Mutation {
    createProfile(fields: [FieldInput!]!): Profile!
    updateProfile(fields: [FieldInput!]!): Profile!
    deleteProfile(id: ID!): Boolean!
  }

  type Profile {
    id: ID!
    fields: [Field]
    userId: String
    user: User
    applications: [Application]
  }
`;
