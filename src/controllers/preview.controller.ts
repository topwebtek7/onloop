import { NextFunction } from "connect";
import { Request, Response } from "express";
import axios from "axios";
import { validate } from "class-validator";
import Tag from "../models/interfaces/tag.interface";
import { PreviewRequest, CollectionNames } from "../models";
import CustomError from "../utils/error.interface";
import db from "../db";
import FirestoreRepository from "../repositories/firestore.repository";

const LINKPREVIEW_KEY = process.env.LINKPREVIEW_KEY;
/**
 * PreviewController.
 */
export default class PreviewController {
  /**
   * A static method fetch link data from LinkPreview and create learn_content, tags documents with response.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public static async previewLink(req: Request<PreviewRequest>, res: Response, next: NextFunction) {
    const previewRequest = new PreviewRequest(req.body);
    const errors = await validate(previewRequest, { forbidUnknownValues: true });
    if (errors.length > 0) {
      const err: CustomError = errors[0].property === 'tags' ? new Error('Invalid tags') as CustomError : new Error(JSON.stringify(errors[0].constraints)) as CustomError;
      err.status = 400;
      next(err)
      return;
    }

    const userRepository = new FirestoreRepository(db, CollectionNames.User);
    const userDocumentRef = await userRepository.readOne(previewRequest.user_id);
    const userData = (await userDocumentRef.get()).data();

    if (!userData) {
      const err: CustomError = new Error(`User not found with user_id ${previewRequest.user_id}`) as CustomError;
      err.status = 404;
      next(err);
      return;
    }

    try {
      const response = (await axios.get(`http://api.linkpreview.net/?key=${LINKPREVIEW_KEY}&q=${previewRequest.url}`)).data;
      const contentDocRef = await userDocumentRef.collection(CollectionNames.Content).add({
        title: response.title,
        description: response.description,
        url: response.url,
        image: response.image,
        created_at: new Date(),
        status: 'unread'
      });
      const tags = req.body.tags || [];
      tags.map(async (tag: Tag) => {
        await contentDocRef.collection(CollectionNames.Tag).add(tag)
      })
      const newContentData = await contentDocRef.get();
      const newTags = (await contentDocRef.collection(CollectionNames.Tag).listDocuments()).map(doc => doc.id);

      res.status(200).send({ ...newContentData.data(), content_id: contentDocRef.id, tags: newTags })
    } catch (err) {
      next(err);
    }
  }
}
