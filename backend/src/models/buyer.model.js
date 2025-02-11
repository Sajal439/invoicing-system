import mongoose, { Schema } from "mongoose";

const buyerSchema = new mongoose.Schema(
  {
    buyerName: {
      type: String,
      required: [true, "buyer name is required"],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number of the buyer is required"],
      unique: true,
      //   match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
    },
    address: {
      type: String,
      required: [true, "Address of the buyer is required"],
    },
  },
  { timestamps: true }
);

export const Buyer = mongoose.model("Buyer", buyerSchema);
