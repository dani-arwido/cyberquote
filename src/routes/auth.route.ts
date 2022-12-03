import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

import authController from '../controllers/auth.controller';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/auth/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authController.signin(req);
    res.status(200).send(user);
  }
);

router.post(
  '/api/auth/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authController.signup(req);

    res.status(201).send(user);
  }
);

router.post(
  '/api/auth/signout',
  (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.session = null;

    res.send({});
  }
);

router.get('/api/auth/currentuser', currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as authRoute };
