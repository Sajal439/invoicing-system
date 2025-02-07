import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);

export { userRouter };
