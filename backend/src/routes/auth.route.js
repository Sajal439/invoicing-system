import { Router } from "express";
import {
  assignRole,
  createAdmin,
  createInitialAdmin,
  forgotPassword,
  getCurrentUser,
  getSetupStatus,
  login,
  logout,
  registerUser,
  resetPassword,
  verifyResetToken,
} from "../controllers/auth.controller.js";
import { addParty } from "../controllers/party.controller.js";
import { authenticate, restrictTo } from "../middlewares/auth.middleware.js";
import { ensureSetupRequired } from "../middlewares/admin.middleware.js";

const userRouter = Router();

userRouter.route("/setup-status").get(getSetupStatus);
userRouter.route("/initial-setup").post(ensureSetupRequired, createInitialAdmin);

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(login);

userRouter.route("/forgot-password").post(forgotPassword);
userRouter.route("/reset-password/:token").patch(resetPassword);
userRouter.route("/verify-reset-token").get(verifyResetToken);

userRouter.use(authenticate);
userRouter.route("/logout").get(logout);
userRouter.route("/me").get(getCurrentUser);

userRouter.use(restrictTo("admin"));
userRouter.route("/create-admin").post(createAdmin);
userRouter.route("/assign-role").post(assignRole);
userRouter.route("/add-party").post(addParty);

export { userRouter };
