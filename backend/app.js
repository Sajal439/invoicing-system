import express from "express";
import cors from "cors";
import morgan from "morgan";

import { ApiError } from "./src/utils/ApiError.js";
import { userRouter } from "./src/routes/user.route.js";
// import { ErrorHandler } from "./src/middlewares/ErrorHandler.middlewares.js";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", userRouter);
// app.use("*", (req, res) => {
//   throw new ApiError(404, "page not found");
// });

export { app };
