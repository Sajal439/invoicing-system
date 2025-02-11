import { Buyer } from "../models/buyer.model.js";
import { Invoice } from "../models/invoice.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const newInvoice = asyncHandler(async (req, res) => {
  const { products, discount, buyerName } = req.body;

  // fetch buyer details from database

  const buyer = await Buyer.findOne({ buyerName });
  console.log("Buyer", buyer);

  if (!buyer) {
    return res.status(404).json(new ApiError(404, "Buyer not found"));
  }

  let totalPrice = 0;
  const productDetails = [];

  // fetch product details and calculate total

  for (const item of products) {
    const product = await Product.findOne({ productName: item.productName });

    if (!product) {
      return res
        .status(404)
        .json(new ApiError(404, `Product ${item.productName} not found`));
    }
    const productTotalPrice = product.productPrice * item.quantity;
    totalPrice += productTotalPrice;
    productDetails.push({
      productName: item.productName,
      price: product.productPrice,
      quantity: item.quantity,
      total: productTotalPrice,
    });
  }

  // Discount
  const finalPrice = totalPrice - totalPrice * (discount / 100);

  // create invoice

  const invoice = new Invoice({
    products: productDetails,
    total: finalPrice,
    discount,
    buyerName,
    phoneNumber: buyer.phoneNumber,
    address: buyer.address,
  });
  await invoice.save();

  for (const item of productDetails) {
    const product = await Product.findOne({ productName: item.productName });
    if (product) {
      product.quantity -= item.quantity;
      if (product.quantity < 0) {
        return res.status(400).json(new ApiError(400, "Product out of stock"));
      }
      await product.save();
    }
  }

  buyer.totalPurchase = (buyer.totalPurchase || 0) + finalPrice;
  await buyer.save();

  console.log("Invoice", invoice);
  return res
    .status(201)
    .json(new ApiResponse(201, invoice, "Invoice created successfully"));
});

export { newInvoice };
