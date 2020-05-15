import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

export default {
  Query: {
    jobs: combineResolvers(
      isAuthenticated,
      async (parent, args, { models }) => {
      return await models.Job.find();
    }),
    job: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models }) => {
      return await models.Job.findById(id);
    }),
  },
};
