import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

const requestObjects = ['body', 'params', 'query'];

/**
 * Filters the keys of an object to include only those in a specified array, and removes empty objects.
 *
 * @param {Object} req - The object to filter.
 * @returns {Object} A new object that includes only the filtered keys and their corresponding values.
 */
function filterRequestKeys(req: any): any {
  const filteredKeys = Object.keys(req).filter((key) =>
    requestObjects.includes(key),
  );
  const filteredObj = filteredKeys.reduce((obj: any, key: any) => {
    if (Object.keys(req[key]).length > 0) {
      obj[key] = req[key];
    }
    return obj;
  }, {});
  return filteredObj;
}

/**
 * Middleware function to validate request data against a Joi schema.
 *
 * @param {ObjectSchema} schema - The Joi schema to validate the request data against.
 * @returns {Function} A middleware function that validates the request data against the schema.
 */
function validateSchema(schema: ObjectSchema) {
  /**
   * Middleware function that validates the request data against the schema.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function.
   */
  return (req: Request, res: Response, next: NextFunction) => {
    const filteredReq = filterRequestKeys(req);
    const { error } = schema.validate(filteredReq, { abortEarly: false });

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((detail) => detail.message) });
    }

    next();
  };
}

export default validateSchema;
