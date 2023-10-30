import { Request, Response, NextFunction } from 'express';
import userServices from '../../services/users/users.service';
import validateSchema from '../../middlewares/validateSchema';
import userSchemas from './users.schema';

/**
 * Get all users.
 * @param {Request} req - Object of request of Express.
 * @param {Response} res - Object of response of Express.
 */
async function getUsersHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { page = 1, limit = 10 } = req.query;
    const limitNumber = Number(limit);
    const skip = (Number(page) - 1) * limitNumber;

    const users = await userServices.getUsers(skip, limitNumber);
    const count = await userServices.countUsers();
    const totalPages = Math.ceil(count / limitNumber);

    res.status(200).json({
      data: users,
      limit: Number(limit),
      page: Number(page),
      totalItems: count,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
}

const usersController = {
  getUsers: [validateSchema(userSchemas.getAllUsers), getUsersHandler],
};

export default usersController;
