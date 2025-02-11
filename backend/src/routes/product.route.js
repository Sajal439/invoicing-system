import { Router } from "express";
import {
  addProduct,
  addProductQuantity,
  deleteProductQuantity,
  updateCost,
  updatePrice,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.route("/add-product").post(addProduct);
productRouter.route("/update-product/add-quantity").put(addProductQuantity);
productRouter
  .route("/update-product/deduct-quantity")
  .put(deleteProductQuantity);

productRouter.route("/update-price").put(updatePrice);
productRouter.route("/product-cost", updateCost);
export { productRouter };
