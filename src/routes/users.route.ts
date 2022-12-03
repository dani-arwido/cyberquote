import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

import usersController from '../controllers/users.controller';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.get(
  '/api/users',
  currentUser,
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await usersController.index(req.query);
    res.status(200).send(users);
  }
);

router.put(
  '/api/users/:id',
  currentUser,
  requireAuth,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await usersController.update(req);
    res.status(201).send(users);
  }
);

router.delete(
  '/api/users/:id',
  currentUser,
  requireAuth,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await usersController.delete(req.params.id);
    res.status(201).send(user);
  }
);

export { router as userRoute };
