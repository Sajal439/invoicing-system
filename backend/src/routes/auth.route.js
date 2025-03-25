import { Router } from "express";
import {
  assignRole,
  forgotPassword,
  getCurrentUser,
  login,
  logout,
  registerUser,
  resetPassword,
  verifyResetToken,
} from "../controllers/auth.controller.js";
import { addParty } from "../controllers/party.controller.js";
import { authenticate, restrictTo } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/forgot-password").post(forgotPassword);
userRouter.route("/reset-password/:token").patch(resetPassword);
userRouter.route("/verify-reset-token").get(verifyResetToken);

userRouter.use(authenticate);
userRouter.route("/me").get(getCurrentUser);
userRouter.route("/assign-role").post(restrictTo("admin"), assignRole);
userRouter.route("/add-party").post(restrictTo("admin"), addParty);

export { userRouter };
