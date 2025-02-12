import { Router } from "express";
import { login, registerUser } from "../controllers/auth.controller.js";
import { addParty } from "../controllers/party.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(login);
userRouter.route("/add-party").post(addParty);

export { userRouter };
