import Joi from 'joi';

const getAllUsers = Joi.object({
  query: Joi.object({
    limit: Joi.number().integer().min(1).max(100).optional(),
    page: Joi.number().integer().min(1).optional(),
  }),
});

const register = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  }).required(),
});

const getUserById = Joi.object({
  params: Joi.object({
    id: Joi.string().required().hex().length(24),
  }),
});

const userSchemas = {
  getAllUsers,
  register,
  getUserById,
};

export default userSchemas;
