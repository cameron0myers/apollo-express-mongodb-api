import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import jwt from 'jsonwebtoken';
import express from 'express';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';

import config from './config';
import models, { connectDb } from './models';
import schema from './schema';
import resolvers from './resolvers';

const app = express();

app.use(cors());

app.use(morgan('dev'));

const getMe = async (req) => {
  const tokenWithBearer = req.headers.authorization || '';
  const token = tokenWithBearer.split(' ')[1]

  if (token) {
    try {
      const user = await jwt.verify(token, process.env.SECRET);
      return user;
    } catch (e) {
      // throw new AuthenticationError(
      //   'Your session expired. Sign in again.',
      // );
    }
  }
  return null;
};

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  formatError: (error) => {
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
  context: async ({ req }) => {

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.SECRET,
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

connectDb().then(async () => {
  if (config.isTest) {
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
    console.log(
      `Apollo Server on http://localhost:${config.port}/graphql`,
    );
  });
});

const createSampleData = async (date) => {
  const user = new models.User({
    username: 'bill_gates',
    email: 'bill@microsoft.com',
    password: 'billgates',
    createdAt: date.setSeconds(date.getSeconds() + 1),
  });

  const job = new models.Job({
    source: 'upwork.com',
    company: 'Dial.Work',
    platform: 'greenhouse',
    url: 'https://www.upwork.com/job/job_title_sample',
    createdAt: date.setSeconds(date.getSeconds() + 1),
  });

  await user.save();
  await job.save();
};
