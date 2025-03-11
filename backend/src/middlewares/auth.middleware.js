import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

// middleware to verify jwt token

export const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  // get token from header or cookie

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new ApiError(401, "You are not logged in. Please login to get access")
    );
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new ApiError(
          401,
          "The user belonging to this token does no longer exist"
        )
      );
    }
    // check if user is active
    if (!currentUser.isActive) {
      return next(new ApiError(401, "User is inactive. Please contact admin"));
    }

    // grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid token. Please login again"));
  }
});

//middleware to restrict access to certain roles
export const restrctTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(403, "You do not have permission to perform this action")
      );
    }
    next();
  };
};
