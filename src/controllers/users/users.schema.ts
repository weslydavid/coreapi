import Joi from 'joi';

const getAllUsers = Joi.object({
  query: Joi.object({
    limit: Joi.number().integer().min(1).max(100).optional(),
    page: Joi.number().integer().min(1).optional(),
  }),
});

const userSchemas = {
  getAllUsers,
};

export default userSchemas;
