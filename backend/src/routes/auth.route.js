import { Router } from "express";
import { login, registerUser } from "../controllers/auth.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(login);

export { userRouter };
