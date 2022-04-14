import { Router } from "express";
import UserController from "../controllers/user.controller";
import PreviewController from "../controllers/preview.controller";

const router: Router = Router();

const userRoutes: Router = Router();
userRoutes.post("/", UserController.create);
userRoutes.get("/:id", UserController.readOne);
userRoutes.get("/", UserController.readAll);
userRoutes.put("/:id", UserController.update);
userRoutes.delete("/:id", UserController.delete);

router.use("/user", userRoutes);

router.post("/previewLink", PreviewController.previewLink);

export default router;
