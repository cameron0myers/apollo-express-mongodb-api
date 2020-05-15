import { gql } from 'apollo-server-express';

import userSchema from './user';
import profileSchema from './profile';
import applicationSchema from './application';
import jobSchema from './job';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  type Field {
    name: String!
    value: String!
  }

  input FieldInput {
    name: String!
    value: String!
  }
`;

export default [linkSchema, userSchema, profileSchema, applicationSchema, jobSchema];
