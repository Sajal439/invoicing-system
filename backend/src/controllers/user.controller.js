import { asyncHandler } from "../utils/AsyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.json({ message: "Register user" });
});

export { registerUser };
