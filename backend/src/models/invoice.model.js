import mongoose, { Schema } from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceType: {
      type: String,
      required: true,
      enum: [
        "purchase",
        "sale",
        "paymentGiven",
        "paymentRecieved",
        "saleReturn",
      ],
    },
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
    partyName: {
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
