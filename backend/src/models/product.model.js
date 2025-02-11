import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    productPrice: {
      type: Number,
      required: [true, "Product price is required"],
      default: 0.0,
    },
    productCost: {
      type: Number,
      required: [true, "Product cost is required"],
      default: 0.0,
    },
    description: {
      type: String,
      // required: [true, "Product description is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Product stock is required"],
      default: 0,
    },
    brand: {
      type: String,
      required: [true, "Product brand is required"],
    },
    productImage: {
      type: String,
    },
  },
  //   {
  //     name: {
  //       type: String,
  //       required: [true, "Product name is required"],
  //       trim: true,
  //       maxLength: [100, "Product name cannot exceed 100 characters"],
  //     },
  //     price: {
  //       type: Number,
  //       required: [true, "Product price is required"],
  //       maxLength: [5, "Product price cannot exceed 5 characters"],
  //       default: 0.0,
  //     },
  //     description: {
  //       type: String,
  //       required: [true, "Product description is required"],
  //     },
  //     ratings: {
  //       type: Number,
  //       default: 0,
  //     },
  //     images: [
  //       {
  //         public_id: {
  //           type: String,
  //           required: true,
  //         },
  //         url: {
  //           type: String,
  //           required: true,
  //         },
  //       },
  //     ],
  //     category: {
  //       type: String,
  //       required: [true, "Category for this product is required"],
  //     },
  //     seller: {
  //       type: String,
  //       required: [true, "Seller of this product is required"],
  //     },
  //     stock: {
  //       type: Number,
  //       required: [true, "Product stock is required"],
  //       maxLength: [5, "Product stock cannot exceed 5 characters"],
  //       default: 0,
  //     },
  //     numOfReviews: {
  //       type: Number,
  //       default: 0,
  //     },
  //     reviews: [
  //       {
  //         user: {
  //           type: mongoose.Schema.ObjectId,
  //           ref: "User",
  //           required: true,
  //         },
  //         name: {
  //           type: String,
  //           required: true,
  //         },
  //         rating: {
  //           type: Number,
  //           required: true,
  //         },
  //         comment: {
  //           type: String,
  //           required: true,
  //         },
  //       },
  //     ],
  //   },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
