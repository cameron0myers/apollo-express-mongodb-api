import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

export default {
  Query: {
    application: async (parent, { id }, { models }) => {
      return await models.Application.findById(id);
    }, // find by id
    applications: combineResolvers( // mutiple resolvers into one
      isAuthenticated, // check a user is authenticated
      async (parent, args, { models, me }) => {
      return await models.Application.find({ userId: me.id });
    }), // if the user is authenticated, return this user's applications
  },

  Mutation: {
    createApplication: combineResolvers(
      isAuthenticated,
      async (parent, { fields, jobId }, { models, me }) => { // get models and me from the context map.
        const application = await models.Application.create({
          fields,
          jobId,
          userId: me.id,
        }); // create application
        const profile = await models.Profile.findOne({ userId: me.id });
        let uprofile = null;
        if(!profile) { // if profile is not exist, create one
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
          }); // update existing fields.
          ufields = ufields.concat(newItems); // add new fields.
          uprofile = await models.Profile.findByIdAndUpdate(
            profile._id,
            { fields: ufields },
            { new: true },
          ); // then update the profile
        }

        return application;
      },
    ),
  },

  Application: { // reference of the user and job
    user: async (application, args, { models }) => {
      return await models.User.findById(application.userId);
    },
    job: async (application, args, { models }) => {
      return await models.Job.findById(application.jobId);
    },
  },
};
