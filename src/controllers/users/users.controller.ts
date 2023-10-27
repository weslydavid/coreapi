import { Request, Response } from 'express';
import userServices from '../../services/users/users.service';

/**
 * Obtiene una lista de usuarios.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 */
async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await userServices.getUsers();
    res.status(200).json(users);
  } catch (error) {
    const err = error as Error;
    res.status(500).send({
      message: err.message,
      name: '[getUsers]',
    });
  }
}

const usersController = {
  getUsers,
};

export default usersController;
