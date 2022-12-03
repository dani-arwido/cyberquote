import 'express-async-errors';

import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import helmet from 'helmet';

import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { authRoute } from './routes/auth.route';
import { userRoute } from './routes/users.route';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(helmet());
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(userRoute);
app.use(authRoute);

app.all('*', async (req, res) => {
  throw new NotFoundError('Routes not found');
});

app.use(errorHandler);

export { app };
