import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
// Helper function to sign JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Helper function to send token response
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Set JWT as an HTTP-Only cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only send on HTTPS in production
  };

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, email, password, passwordConfirm } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ApiError(400, "User already exists with this email"));
  }

  const newUser = await User.create({
    fullName,
    email,
    password,
    passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new ApiError(400, "Please provide email and password"));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new ApiError(401, "Incorrect email or password"));
  }

  // 3) Send token to client
  createSendToken(user, 200, res);
});

const logout = asyncHandler(async (req, res) => {
  // Clear the JWT cookie
  res.cookie("jwt", "loggedOut", {
    expires: new Date(Date.now() + 10 * 1000), // Expires in 10 seconds
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
});

const assignRole = asyncHandler(async (req, res, next) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return next(new ApiError(400, "Please provide email and role"));
  }

  //validate role input
  const valideRoles = ["admin", "user", "manager"];
  if (!valideRoles.includes(role)) {
    return next(new ApiError(400, "Invalid role"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  //update user role

  user.role = role;
  await user.save();
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: { email: user.email, role: user.role } },
        "Role assigned successfully"
      )
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { user: req.user }, "Success"));
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ApiError(400, "Please provide email"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  // Generate random reset token

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/users/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: "Goel Traders <noreply@goeltraders.com>",
      to: user.email,
      subject: "Your password reset token (valid for 10 min)",
      text: `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`,
      html: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Reset Your Password</h2>
          <p>Hello ${user.fullName},</p>
          <p>You requested a password reset. Please click the button below to reset your password:</p>
          <a href="${resetURL.replace(
            "/api/users/reset-password/",
            "/reset-password/"
          )}" 
             style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; margin: 20px 0;">
            Reset Password
          </a>
          <p>If you didn't request this, please ignore this email.</p>
          <p>This password reset link is valid for 10 minutes.</p>
          <p>Best regards,<br>Goel Traders Team</p>
        </div>`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json(new ApiResponse(200, {}, "Password rest link sent to email"));
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ApiError(500, "Error sending email"));
  }
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { password, passwordConfirm } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError(400, "Token is invalid or has expired"));
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

export {
  registerUser,
  login,
  logout,
  assignRole,
  getCurrentUser,
  forgotPassword,
  resetPassword,
};
