import mongoose from "mongoose";

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
    paidAmout: {
      type: Number,
      default: 0,
    },
    balanceAmout: {
      type: Number,
      default: function () {
        return this.total;
      },
    },
    dueDate: {
      type: Date,
      default: function () {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        return date;
      },
    },
  },
  { timestamps: true }
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);
