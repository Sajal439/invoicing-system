import mongoose, { Schema } from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    products: {
      type: [],
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
    },
    buyerName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);
