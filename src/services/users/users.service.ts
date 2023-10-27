import User from '../../models/users.model';
import { IUser } from '../../types/userTypes';

const getUsers = async (): Promise<IUser[]> => {
  const users = await User.find();
  return users;
};

const repo = {
  getUsers,
};

export default repo;
