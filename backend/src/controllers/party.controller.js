import { Party } from "../models/party.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addParty = asyncHandler(async (req, res) => {
  const { partyName, phoneNumber, address, partyType } = req.body;

  const party = await Party.create({
    partyName,
    phoneNumber,
    address,
    partyType,
  });

  if (!party) {
    return res
      .status(404)
      .json(new ApiError(400, "party not added successfully"));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, party, "Party successfully added"));
});

export { addParty };
