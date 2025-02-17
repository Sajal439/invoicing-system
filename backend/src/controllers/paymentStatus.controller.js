import { Party } from "../models/party.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { partyName, paymentStatus } = req.body;

  const party = await Party.findOne({ partyName });

  if (!party) {
    return res
      .status(404)
      .json(new ApiError(404, `Party ${partyName} not found`));
  }

  try {
    party.setPaymentStatus(paymentStatus);
    await party.save();
    return res
      .status(200)
      .json(new ApiResponse(200, party, "Payment status updated successfully"));
  } catch (error) {
    return res
      .status(400)
      .json(new ApiError(400, "Payment status not updated", error));
  }
});

export { updatePaymentStatus };
