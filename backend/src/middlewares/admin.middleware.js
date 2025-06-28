import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// Middleware to ensure system has been initialized
export const ensureSetupComplete = asyncHandler(async (req, res, next) => {
  const adminExists = await User.findOne({ role: "admin" });

  if (!adminExists) {
    return next(
      new ApiError(
        503,
        "System not initialized. Please complete initial setup."
      )
    );
  }

  next();
});

// Middleware to ensure initial setup can proceed
export const ensureSetupRequired = asyncHandler(async (req, res, next) => {
  const adminExists = await User.findOne({ role: "admin" });

  if (adminExists) {
    return next(new ApiError(403, "Initial setup already completed"));
  }

  next();
});
