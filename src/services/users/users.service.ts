import User from '../../models/users.model';
import { IUser } from '../../types/userTypes';

const getUsers = async (skip: number, limit: number): Promise<IUser[]> => {
  const users = await User.find().skip(skip).limit(limit).exec();
  return users;
};

const getUserById = async (userId: string): Promise<IUser | null> => {
  const users = await User.findById(userId);
  return users;
};

const countUsers = async (): Promise<number> => {
  const count = await User.countDocuments();
  return count;
};

const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const users = await User.findOne({ email }).exec();
  return users;
};

const createUser = async (user: IUser): Promise<IUser> => {
  const createdUser = await User.create(user);
  return createdUser;
};

const repo = {
  countUsers,
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
};

export default repo;
