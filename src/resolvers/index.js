import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import profileResolvers from './profile';
import applicationResolvers from './application';
import jobResolvers from './job';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  profileResolvers,
  applicationResolvers,
  jobResolvers
];
