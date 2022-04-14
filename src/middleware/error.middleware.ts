import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/error.interface";

/**
 * Middleware function used on the request's pipeline to deliver error messages.
 * @param err Custom error object
 * @param _req The request that originated the error
 * @param res The response that's sent to the client
 * @param _ The next function executed in the app's middleware
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function errorMiddleware(err: Error, _req: Request, res: Response, _: NextFunction) {
  const error: CustomError = err as CustomError;
  res.status(error.status || 500).send({
    error: error.message,
  });
}
