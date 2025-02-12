import { Invoice } from "../models/invoice.model.js";
import { Party } from "../models/party.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const newInvoice = asyncHandler(async (req, res) => {
  const { products, discount, partyName, invoiceType } = req.body;

  let party;
  if (invoiceType === "purchase") {
    party = await Party.findOne({ partyName, partyType: "dealer" });
  } else if (invoiceType === "sale") {
    party = await Party.findOne({ partyName, partyType: "buyer" });
  } else {
    return res.status(400).json(new ApiError(400, "Invalid invoice type"));
  }
  console.log("Party", party);
  if (!party) {
    return res
      .status(404)
      .json(
        new ApiError(
          404,
          `Party ${partyName} not found. Please add party first`
        )
      );
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
    partyName: party.partyName,
    phoneNumber: party.phoneNumber,
    address: party.address,
    invoiceType,
  });
  await invoice.save();

  for (const item of productDetails) {
    const product = await Product.findOne({ productName: item.productName });
    if (product) {
      if (invoiceType === "purchase") {
        product.quantity += item.quantity;
      } else if (invoiceType === "sale") {
        product.quantity -= item.quantity;
        if (product.quantity < 0) {
          return res
            .status(400)
            .json(new ApiError(400, "Product quantity not available"));
        }
      }
      await product.save();
    }
  }

  party.totalInvoiceAmount = (party.totalInvoiceAmount || 0) + finalPrice;
  await party.save();

  console.log("Invoice", invoice);
  return res
    .status(201)
    .json(new ApiResponse(201, invoice, "Invoice created successfully"));
});

export { newInvoice };
