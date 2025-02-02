import express from "express";
import { userRouter } from "./src/routes/user.route.js";
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);

export { app };
