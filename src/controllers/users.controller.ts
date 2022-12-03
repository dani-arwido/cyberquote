import { Request } from 'express';

import { BadRequestError } from '../errors/bad-request-error';
import { NotFoundError } from '../errors/not-found-error';
import { User } from '../models/users.model';

export class UsersController {
  async index(query: { [key: string]: string } | {}) {
    if (Object.keys(query).length > 0) {
      if (!('email' in query)) {
        throw new BadRequestError('Invalid query');
      }
    }
    const users = await User.find(query);
    return users;
  }

  async update(req: Request) {
    const { id } = req.params;
    const { email, password } = req.body;
    const user = await User.findById({ _id: id });
    if (!user) throw new NotFoundError('User not found');

    user.email = email;
    user.password = password;

    await user.save();
    return user;
  }

  delete(id: string) {
    return User.deleteOne({ id });
  }
}

export default new UsersController();
