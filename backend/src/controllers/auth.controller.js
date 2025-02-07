import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const newUser = await User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new ApiError(400, "Please provide email and password"));
  }
  // 2 Check if user exists && password is correct
  const existingUser = await User.findOne({ email }).select("+password");
  if (
    !existingUser ||
    !(await existingUser.correctPassword(password, existingUser.password))
  ) {
    return next(new ApiError(401, "Incorrect email or password"));
  }

  // 3 If everything is ok, send token to client
  const token = signToken(existingUser._id);
  console.log("Token", token);
  console.log("existing user", existingUser);
  res.status(200).json({ status: "success", token });
});

export { registerUser, login };
