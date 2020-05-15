import { PubSub } from 'apollo-server';

import * as APPLICATION_EVENTS from './application';

export const EVENTS = {
  APPLICATION: APPLICATION_EVENTS,
};

export default new PubSub();
