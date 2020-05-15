import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated, isProfileOwner } from './authorization';

export default {
  Query: {
    profile: async (parent, { id }, { models }) => {
      return await models.Profile.findById(id);
    },
  },

  Mutation: {
    createProfile: combineResolvers(
      isAuthenticated,
      async (parent, { fields }, { models, me }) => {
        const profile = await models.Profile.findOne({ userId: me.id });
        if(profile) {
          throw new Error("Can't create more than one profile per user");
        }
        const uprofile = await models.Profile.create({
          fields,
          userId: me.id,
        });

        return uprofile;
      },
    ),

    updateProfile: combineResolvers(
      isAuthenticated,
      async (parent, { fields }, { models, me }) => {
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
        return uprofile;
      },
    ),

    deleteProfile: combineResolvers(
      isAuthenticated,
      isProfileOwner,
      async (parent, { id }, { models }) => {
        const profile = await models.Profile.findById(id);

        if (profile) {
          await profile.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  },

  Profile: {
    user: async (profile, args, { models }) => {
      const user = await models.User.findById(profile.userId);
      return user;
    },
    applications: async (profile, args, { models }) => {
      return await models.Application.find({
        userId: profile.userId,
      });
    },
  },
};
