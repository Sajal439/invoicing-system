import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  console.error("ERROR 💥", err);

  // Default error
  let error = Object.assign({}, err);
  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `Duplicate field value: ${value} for field ${field}. Please use another value!`;
    error = new ApiError(400, message);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((val) => val.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    error = new ApiError(400, message);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    error = new ApiError(401, "Invalid token. Please log in again!");
  }

  if (err.name === "TokenExpiredError") {
    error = new ApiError(401, "Your token has expired! Please log in again.");
  }

  // Send error response
  res.status(error.statusCode).json({
    status: "error",
    message: error.message,
    errors: error.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export { errorHandler };
