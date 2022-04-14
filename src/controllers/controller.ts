import { NextFunction, Request, Response } from "express";
import db from "../db";
import FirestoreRepository from "../repositories/firestore.repository";
import CustomError from "../utils/error.interface";
import IController from "./interfaces/controller.interface";

/**
 * Modular Controller with CRUD methods using Firestore repository and DocumentData type.
 */
export default class Controller implements IController {

  /**
   * Firebase repository used by CRUD methods.
   */
  private repository: FirestoreRepository;

  constructor(collectionName: string) {
    this.repository = new FirestoreRepository(db, collectionName);
  }

  /**
   * Create a document in Firestore collection using the DocumentData received in the request body.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public async create(req: Request, res: Response, next: NextFunction) {
    if (req.body == null) {
      const err: CustomError = new Error("The body was empty or undefined") as CustomError;
      err.status = 400;
      next(err);
      return;
    }
    try {
      const data = await this.repository.create(req.body);
      res.status(201).send({ id: data.id });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Read one document by the given id.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public async readOne(req: Request, res: Response, next: NextFunction) {
    if (req.params.id == null) {
      const err: CustomError = new Error("The id was undefined") as CustomError;
      err.status = 400;
      next(err);
      return;
    }

    try {
      const value = await this.repository.readOne(req.params.id);
      const data = (await value.get()).data();
      if (data) {
        res.status(200).send({ ...data, id: value.id });
      } else {
        const err: CustomError = new Error("The entity was not found") as CustomError;
        err.status = 404;
        next(err);
      }
    } catch (e) {
      next(e);
    }
  }

  /**
   * Read all documents available in the Firestore collection.
   * @param _req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public async readAll(_req: Request, res: Response, next: NextFunction) {    
    try {
      const list = await this.repository.readAll();
      if (list.length === 0) {
        const err: CustomError = new Error("The list of entities was empty") as CustomError;
        err.status = 204;
        next(err);
        return;
      }
      const allUserDocuments = await Promise.all(list.map((item) => item.get()));
      const result = allUserDocuments.map((result) => ({ ...result.data(), id: result.id }));
      res.status(200).send(result);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Update document fields by the given id.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public async update(req: Request, res: Response, next: NextFunction) {
    if (req.body == null) {
      const err: CustomError = new Error("The body was empty or undefined") as CustomError;
      err.status = 400;
      next(err);
      return;
    }

    if (req.params.id == null) {
      const err: CustomError = new Error("The id was undefined") as CustomError;
      err.status = 400;
      next(err);
      return;
    }

    try {
      const value = await this.repository.update(req.params.id, req.body);
      const data = (await value.get()).data();
      res.status(200).send({ ...data, id: value.id });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Delete document by the given id
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public async delete(req: Request, res: Response, next: NextFunction) {
    if (req.params.id == null) {
      const err: CustomError = new Error("The id was undefined") as CustomError;
      err.status = 400;
      next(err);
      return;
    }

    try {
      await this.repository.delete(req.params.id);
      res.status(200).send({ result: "Deleted successfully" });
    } catch (e) {
      next(e);
    }
  }
}
