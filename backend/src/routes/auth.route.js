import { Router } from "express";
import { login, registerUser } from "../controllers/auth.controller.js";
import { addBuyer } from "../controllers/buyer.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(login);
userRouter.route("/add-buyer").post(addBuyer);

export { userRouter };
