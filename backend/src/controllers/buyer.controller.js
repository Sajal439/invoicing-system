import { Buyer } from "../models/buyer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addBuyer = asyncHandler(async (req, res) => {
  const { buyerName, phoneNumber, address } = req.body;

  const buyer = await Buyer.create({
    buyerName,
    phoneNumber,
    address,
  });

  const createdBuyer = await Buyer.findById(buyer._id);

  if (!createdBuyer) {
    return res
      .status(404)
      .json(new ApiError(400, "buyer not added successfully"));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, buyer, "Buyer successfully added"));
});

export { addBuyer };
