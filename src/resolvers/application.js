import { combineResolvers } from 'graphql-resolvers';

import pubsub, { EVENTS } from '../subscription';
import { isAuthenticated } from './authorization';

export default {
  Query: {
    application: async (parent, { id }, { models }) => {
      return await models.Application.findById(id);
    },
    applications: combineResolvers(
      isAuthenticated,
      async (parent, args, { models, me }) => {
      return await models.Application.find({ userId: me.id });
    }),
  },

  Mutation: {
    createApplication: combineResolvers(
      isAuthenticated,
      async (parent, { fields, jobId }, { models, me }) => {
        const application = await models.Application.create({
          fields,
          jobId,
          userId: me.id,
        });
        const profile = await models.Profile.findOne({ userId: me.id });
        let uprofile = null;
        if(!profile) {
          uprofile = await models.Profile.create({
            fields,
            userId: me.id,
          });
        } else {
          const newItems = [...fields];
          let ufields = profile.fields.map(item => {
            const index = newItems.findIndex(uitem => uitem.name === item.name);
            if(index !== -1) {
              const [uitem] = newItems.splice(index, 1);
              return uitem;
            } else {
              return {name: item.name, value: item.value};
            }
          });
          ufields = ufields.concat(newItems);
          uprofile = await models.Profile.findByIdAndUpdate(
            profile._id,
            { fields: ufields },
            { new: true },
          );
        }

        return application;
      },
    ),
  },

  Application: {
    user: async (application, args, { models }) => {
      return await models.User.findById(application.userId);
    },
    job: async (application, args, { models }) => {
      return await models.Job.findById(application.jobId);
    },
  },

  Subscription: {
    applicationCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.APPLICATION.CREATED),
    },
  },
};
