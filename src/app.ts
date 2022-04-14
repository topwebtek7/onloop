import cors from "cors";
import * as express from "express";
import errorMiddleware from "./middleware/error.middleware";
import routes from "./routes";

const app = express.default();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true }));
app.use("/", routes);

app.use("/", errorMiddleware);
app.use(errorMiddleware);

export default app;
