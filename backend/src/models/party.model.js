import mongoose from "mongoose";

const partySchema = new mongoose.Schema(
  {
    partyName: {
      type: String,
      required: [true, "Dealer name is required"],
      trim: true,
    },
    partyType: {
      type: String,
      required: [true, "Party type is required"],
      enum: ["buyer", "dealer"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number of the dealer is required"],
      unique: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
    },
    address: {
      type: String,
      required: [true, "Address of the dealer is required"],
    },
    totalInvoiceAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Party = mongoose.model("Party", partySchema);
