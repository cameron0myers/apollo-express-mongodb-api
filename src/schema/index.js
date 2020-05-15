import { gql } from 'apollo-server-express';

import userSchema from './user';
import profileSchema from './profile';
import applicationSchema from './application';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Field {
    name: String!
    value: String!
  }
`;

export default [linkSchema, userSchema, profileSchema, applicationSchema];
