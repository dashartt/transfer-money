import cors from "cors";
import express from "express";
import routes from "./routes";
import ErrorHandler from "./middlewares/ErrorHandler";

const app = express();
const errorHandler = new ErrorHandler().catchErrors;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(routes);
app.use(errorHandler);

export default app;
