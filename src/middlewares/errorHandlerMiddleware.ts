import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to handle errors.
 * @param {Error} err - Error object.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
export function errorMiddleware() {
  return function (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    console.error(
      JSON.stringify({
        error: {
          message: err.message,
          stack: err.stack,
        },
        headers: req.headers,
        method: req.method,
        params: req.params,
        querys: req.query,
        url: req.url,
      }),
    );
    try {
      return res.status(500).json({ error: err.message });
    } catch (error) {
      return next(error);
    }
  };
}
