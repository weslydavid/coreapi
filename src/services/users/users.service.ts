import User from '../../models/users.model';
import { IUser } from '../../types/userTypes';

const getUsers = async (skip: number, limit: number): Promise<IUser[]> => {
  const users = await User.find().skip(skip).limit(limit).exec();
  return users;
};

const countUsers = async (): Promise<number> => {
  const count = await User.countDocuments();
  return count;
};

const repo = {
  countUsers,
  getUsers,
};

export default repo;
