import mongoose from 'mongoose';

import User from './user';
import Profile from './profile';
import Job from './job';
import Application from './application';

const models = { User, Application, Job, Profile };

const connectDb = () => {
  return mongoose.connect(
    process.env.TEST && process.env.TEST_DATABASE_URL
      ? process.env.TEST_DATABASE_URL
      : process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
  );
};

export { connectDb };

export default models;
