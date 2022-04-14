import { NextFunction, Request, Response } from "express";

export default interface IController {
  create(req: Request, res: Response, next: NextFunction): void;
  readOne(req: Request, res: Response, next: NextFunction): void;
  readAll(req: Request, res: Response, next: NextFunction): void;
  update(req: Request, res: Response, next: NextFunction): void;
  delete(req: Request, res: Response, next: NextFunction): void;
}
