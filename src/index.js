import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import jwt from 'jsonwebtoken';
import DataLoader from 'dataloader';
import express from 'express';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';

import config from './config';
import models, { connectDb } from './models';
import loaders from './loaders';

const app = express();

app.use(cors());

app.use(morgan('dev'));

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

connectDb().then(async () => {
  if (!config.isProduction) {
    // reset database
    await Promise.all([
      models.User.deleteMany({}),
      models.Profile.deleteMany({}),
      models.Job.deleteMany({}),
      models.Application.deleteMany({}),
    ]);

    createSampleData(new Date());
  }

  httpServer.listen({ port: config.port }, () => {
    console.log(`Apollo Server on http://localhost:${config.port}/graphql`);
  });
});

const createSampleData = async date => {
  const user = new models.User({
    username: 'bill_gates',
  });

  const profile = new models.Profile({
    fullname: 'Bill Gates',
    email: 'bill@microsoft.com',
    title: 'CEO',
    address: {
      city: 'Redmond',
      state: 'WA'
    },
    createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: user.id,
  });

  const application = new models.Application({
    fullname: 'Bill Gates',
    email: 'bill@gatesfoundation.com',
    title: 'Philanthropist',
    createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: user.id,
  });

  const job = new models.Job({
    source: 'upwork.com',
    company: 'Dial.Work',
    platform: 'greenhouse',
    url: 'https://www.upwork.com/job/job_title_sample',
    createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: user.id,
  });

  await user.save();
  await profile.save();
  await application.save();
  await job.save();
};
