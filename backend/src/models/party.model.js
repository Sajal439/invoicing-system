import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const partySchema = new mongoose.Schema(
  {
    partyName: {
      type: String,
      required: [true, "Party name is required"],
      trim: true,
    },
    partyType: {
      type: String,
      required: [true, "Party type is required"],
      enum: ["buyer", "dealer"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number of the party is required"],
      unique: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
    },
    address: {
      type: String,
      required: [true, "Address of the party is required"],
    },
    totalInvoiceAmount: {
      type: Number,
      default: 0,
    },
    totalPaidAmount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "partially_paid", "unpaid"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

partySchema.pre("save", function (next) {
  if (this.totalAmount === 0) {
    this.paymentStatus = "unpaid";
  } else if (this.totalPaidAmount === 0) {
    this.paymentStatus = "unpaid";
  } else if (this.totalPaidAmount < this.totalAmount) {
    this.paymentStatus = "partially_paid";
  } else if (this.totalPaidAmount >= this.totalAmount) {
    this.paymentStatus = "paid";
  }
  next();
});

partySchema.methods.setPaymentStatus = function (status) {
  if (["paid", "partially_paid", "unpaid"].includes(status)) {
    this.paymentStatus = status;
  } else {
    throw new ApiError(400, "Invalid payment status");
  }
};

export const Party = mongoose.model("Party", partySchema);
