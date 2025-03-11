import { Router } from "express";
import {
  addProduct,
  addProductQuantity,
  deleteProductQuantity,
  getProductByName,
  getProducts,
  updateCost,
  updatePrice,
} from "../controllers/product.controller.js";
import { authenticate, restrictTo } from "../middlewares/auth.middleware.js";

const productRouter = Router();
productRouter.use(authenticate);

// Read operations - managers and admins can access
productRouter.route("/all").get(restrictTo("admin", "manager"), getProducts);
productRouter
  .route("/:productName")
  .get(restrictTo("admin", "manager"), getProductByName);

// Write operations - only admin can access
productRouter.route("/add-product").post(restrictTo("admin"), addProduct);
productRouter
  .route("/update-product/add-quantity")
  .put(restrictTo("admin"), addProductQuantity);
productRouter
  .route("/update-product/deduct-quantity")
  .put(restrictTo("admin"), deleteProductQuantity);

productRouter.route("/update-price").put(restrictTo("admin"), updatePrice);
productRouter.route("/product-cost").put(restrictTo("admin"), updateCost);

export { productRouter };
