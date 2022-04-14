import { NextFunction } from "connect";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { User, CollectionNames } from "../models";
import CustomError from "../utils/error.interface";
import Controller from "./controller";

/**
 * The specific UserController used by the users route handler.
 */
export default class UserController {

  /**
   * The collection's name used by this controller.
   */
  static controller: Controller = new Controller(CollectionNames.User);

  /**
   * A static method used to parse, validate and create a new User document.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public static async create(req: Request, res: Response, next: NextFunction) {
    const user = new User(req.body);
    const errors = await validate(user, { forbidUnknownValues: true });
    if (errors.length > 0) {
      const err: CustomError = new Error(JSON.stringify(errors[0].constraints)) as CustomError;
      err.status = 400;
      next(err)
      return;
    }
    UserController.controller.create(req, res, next);
  }

  /**
   * A static method used to read one User document by the given id.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public static readOne(req: Request, res: Response, next: NextFunction) {
    UserController.controller.readOne(req, res, next);
  }

  /**
   * A static method used to read all User documents.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public static readAll(req: Request, res: Response, next: NextFunction) {
    UserController.controller.readAll(req, res, next);
  }

  /**
   * A static method used to update certain fields of an User document by the given id.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public static update(req: Request, res: Response, next: NextFunction) {
    UserController.controller.update(req, res, next);
  }

  /**
   * A static method used to delete an User document by the given id.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public static delete(req: Request, res: Response, next: NextFunction) {
    UserController.controller.delete(req, res, next);
  }
}
