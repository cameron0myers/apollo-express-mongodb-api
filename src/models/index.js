import mongoose from 'mongoose';

import User from './user';
import Profile from './profile';
import Job from './job';
import Application from './application';

const models = { User, Application, Job, Profile };

const connectDb = () => {
  if (process.env.TEST) {
    return mongoose.connect(
      process.env.TEST_DATABASE_URL,
      { useNewUrlParser: true },
    );
  } else {
    return mongoose.connect(
      process.env.DATABASE_URL,
      { useNewUrlParser: true },
    );
  }
};

export { connectDb };

export default models;
