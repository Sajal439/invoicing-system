import Joi from "joi";

/**
 * Validation schemas for product-related operations
 */
export const productValidation = {
  /**
   * Validation schema for creating a product
   */
  createProduct: Joi.object({
    productName: Joi.string().trim().required().messages({
      "string.empty": "Product name is required",
      "any.required": "Product name is required"
    }),
    productPrice: Joi.number().min(0).required().messages({
      "number.base": "Product price must be a number",
      "number.min": "Product price cannot be negative",
      "any.required": "Product price is required"
    }),
    productCost: Joi.number().min(0).required().messages({
      "number.base": "Product cost must be a number",
      "number.min": "Product cost cannot be negative",
      "any.required": "Product cost is required"
    }),
    quantity: Joi.number().integer().min(0).required().messages({
      "number.base": "Quantity must be a number",
      "number.integer": "Quantity must be an integer",
      "number.min": "Quantity cannot be negative",
      "any.required": "Quantity is required"
    }),
    brand: Joi.string().trim().required().messages({
      "string.empty": "Brand is required",
      "any.required": "Brand is required"
    }),
    description: Joi.string().allow("", null),
    productImage: Joi.string().allow("", null)
  }),

  /**
   * Validation schema for updating product quantity
   */
  updateQuantity: Joi.object({
    productName: Joi.string().trim().required().messages({
      "string.empty": "Product name is required",
      "any.required": "Product name is required"
    }),
    quantityToAdd: Joi.number().integer().required().messages({
      "number.base": "Quantity to add must be a number",
      "number.integer": "Quantity to add must be an integer",
      "any.required": "Quantity to add is required"
    })
  }),

  /**
   * Validation schema for deducting product quantity
   */
  deductQuantity: Joi.object({
    productName: Joi.string().trim().required().messages({
      "string.empty": "Product name is required",
      "any.required": "Product name is required"
    }),
    quantityToDeduct: Joi.number().integer().min(1).required().messages({
      "number.base": "Quantity to deduct must be a number",
      "number.integer": "Quantity to deduct must be an integer",
      "number.min": "Quantity to deduct must be at least 1",
      "any.required": "Quantity to deduct is required"
    })
  }),

  /**
   * Validation schema for updating product price
   */
  updatePrice: Joi.object({
    productName: Joi.string().trim().required().messages({
      "string.empty": "Product name is required",
      "any.required": "Product name is required"
    }),
    updatedPrice: Joi.number().min(0).required().messages({
      "number.base": "Updated price must be a number",
      "number.min": "Updated price cannot be negative",
      "any.required": "Updated price is required"
    })
  }),

  /**
   * Validation schema for updating product cost
   */
  updateCost: Joi.object({
    productName: Joi.string().trim().required().messages({
      "string.empty": "Product name is required",
      "any.required": "Product name is required"
    }),
    updatedCost: Joi.number().min(0).required().messages({
      "number.base": "Updated cost must be a number",
      "number.min": "Updated cost cannot be negative",
      "any.required": "Updated cost is required"
    })
  }),

  /**
   * Validation schema for getting product by name
   */
  getByName: Joi.object({
    productName: Joi.string().trim().required().messages({
      "string.empty": "Product name is required",
      "any.required": "Product name is required"
    })
  })
};
