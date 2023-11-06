import jwt from 'jsonwebtoken';
import { IUser } from '../../types/userTypes';

const createToken = (user: IUser): string => {
  const { TOKEN } = process.env;
  const { email, _id } = user;

  if (!TOKEN) throw new Error('Token is not defined');

  return jwt.sign({ email, userId: _id }, TOKEN, {
    expiresIn: '2h',
  });
};

const repo = {
  createToken,
};

export default repo;
