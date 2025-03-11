import { Router } from "express";
import {
  assignRole,
  getCurrentUser,
  login,
  logout,
  registerUser,
} from "../controllers/auth.controller.js";
import { addParty } from "../controllers/party.controller.js";
import { authenticate, restrctTo } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);

userRouter.use(authenticate);
userRouter.route("/me").get(getCurrentUser);
userRouter.route("/assign-role").post(restrctTo("admin"), assignRole);
userRouter.route("/add-party").post(restrctTo("admin"), addParty);

export { userRouter };
