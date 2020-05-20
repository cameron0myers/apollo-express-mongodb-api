import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.'); // when token is valid, 'me' contains the user's information.

export const isProfileOwner = async (
  parent,
  { id },
  { models, me },
) => {
  const profile = await models.Profile.findById(id);

  if (profile.userId != me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
}; // check before profile modify
