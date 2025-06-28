import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {
  const { productName, productPrice, productCost, quantity, brand } = req.body;

  const numericQuantity = Number(quantity);
  if (isNaN(numericQuantity)) {
    return res
      .status(400)
      .json(new ApiError(400, "Quantity must be a valid number"));
  }
  const existingProduct = await Product.findOne({ productName, brand });

  if (existingProduct) {
    // Update existing product
    existingProduct.productPrice = productPrice;
    existingProduct.productCost = productCost;
    existingProduct.quantity =
      Number(existingProduct.quantity) + numericQuantity; // Add to existing quantity

    await existingProduct.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, existingProduct, "Product updated successfully")
      );
  } else {
    // Create new product
    const newProduct = await Product.create({
      productName,
      productPrice,
      productCost,
      quantity: numericQuantity,
      brand,
    });

    const createdProduct = await Product.findById(newProduct._id);
    if (!createdProduct) {
      return res.status(400).json(new ApiError(400, "Product not created"));
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdProduct, "Product added successfully"));
  }
});

const addProductQuantity = asyncHandler(async (req, res) => {
  const { productName, quantityToAdd } = req.body;

  const product = await Product.findOne({ productName });
  if (!product) {
    return res.status(404).json(new ApiError(404, "Product not found"));
  }
  product.quantity += quantityToAdd;
  await product.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, product, "Product quantity updated successfully")
    );
});

const deleteProductQuantity = asyncHandler(async (req, res) => {
  const { productName, quantityToDeduct } = req.body;

  const product = await Product.findOne({ productName });
  if (!product) {
    return res.status(404).json(new ApiError(404, "Product not found"));
  }
  product.quantity -= quantityToDeduct;
  await product.save();
  return res
    .status(200)
    .json(
      new ApiResponse(200, product, "Product quantity updated successfully")
    );
});
const updatePrice = asyncHandler(async (req, res) => {
  const { productName, updatedPrice } = req.body;
  const product = await Product.findOne({ productName });

  if (!product) {
    return res.status(400).json(new ApiError(404, "Product not found"));
  }
  product.productPrice = updatedPrice;
  await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product Price updated successfully"));
});
const updateCost = asyncHandler(async (req, res) => {
  const { productName, updatedCost } = req.body;
  const product = await Product.findOne({ productName });

  if (!product) {
    return res.status(400).json(new ApiError(404, "Product not found"));
  }
  product.productCost = updatedCost;
  await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product Cost updated successfully"));
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

const getProductByName = asyncHandler(async (req, res) => {
  const { productName } = req.params;

  const product = await Product.findOne({ productName });

  if (!product) {
    return res.status(404).json(new ApiError(404, "product not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

export {
  addProduct,
  addProductQuantity,
  deleteProductQuantity,
  updatePrice,
  updateCost,
  getProducts,
  getProductByName,
};
