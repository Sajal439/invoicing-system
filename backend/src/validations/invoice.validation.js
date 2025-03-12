import Joi from "joi";

/**
 * Validation schemas for invoice-related operations
 */
export const invoiceValidation = {
  /**
   * Validation schema for creating an invoice
   */
  createInvoice: Joi.object({
    invoiceNumber: Joi.string().trim().required().messages({
      "string.empty": "Invoice number is required",
      "any.required": "Invoice number is required"
    }),
    customerName: Joi.string().trim().required().messages({
      "string.empty": "Customer name is required",
      "any.required": "Customer name is required"
    }),
    partyId: Joi.string().trim().required().messages({
      "string.empty": "Party ID is required",
      "any.required": "Party ID is required"
    }),
    invoiceDate: Joi.date().default(Date.now),
    dueDate: Joi.date().min(Joi.ref('invoiceDate')).messages({
      "date.min": "Due date cannot be before invoice date"
    }),
    status: Joi.string().valid("Pending", "Paid", "Overdue", "Cancelled", "Partially Paid").default("Pending"),
    items: Joi.array().items(
      Joi.object({
        productName: Joi.string().trim().required().messages({
          "string.empty": "Product name is required",
          "any.required": "Product name is required"
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          "number.base": "Quantity must be a number",
          "number.integer": "Quantity must be an integer",
          "number.min": "Quantity must be at least 1",
          "any.required": "Quantity is required"
        }),
        price: Joi.number().min(0).required().messages({
          "number.base": "Price must be a number",
          "number.min": "Price cannot be negative",
          "any.required": "Price is required"
        }),
        discount: Joi.number().min(0).max(100).default(0).messages({
          "number.base": "Discount must be a number",
          "number.min": "Discount cannot be negative",
          "number.max": "Discount cannot exceed 100%"
        }),
        tax: Joi.number().min(0).default(0).messages({
          "number.base": "Tax must be a number",
          "number.min": "Tax cannot be negative"
        })
      })
    ).min(1).required().messages({
      "array.min": "At least one item is required",
      "any.required": "Items are required"
    }),
    totalAmount: Joi.number().min(0).messages({
      "number.base": "Total amount must be a number",
      "number.min": "Total amount cannot be negative"
    }),
    discount: Joi.number().min(0).default(0).messages({
      "number.base": "Discount must be a number",
      "number.min": "Discount cannot be negative"
    }),
    tax: Joi.number().min(0).default(0).messages({
      "number.base": "Tax must be a number",
      "number.min": "Tax cannot be negative"
    }),
    shippingCost: Joi.number().min(0).default(0).messages({
      "number.base": "Shipping cost must be a number",
      "number.min": "Shipping cost cannot be negative"
    }),
    notes: Joi.string().allow("", null),
    paymentTerms: Joi.string().allow("", null),
    createdBy: Joi.string().trim()
  }),

  /**
   * Validation schema for updating invoice status
   */
  updateStatus: Joi.object({
    status: Joi.string().valid("Pending", "Paid", "Overdue", "Cancelled", "Partially Paid").required().messages({
      "any.only": "Status must be one of: Pending, Paid, Overdue, Cancelled, Partially Paid",
      "string.empty": "Status is required",
      "any.required": "Status is required"
    })
  }),

  /**
   * Validation schema for invoice filters
   */
  invoiceFilters: Joi.object({
    customerName: Joi.string().trim(),
    startDate: Joi.date(),
    endDate: Joi.date().min(Joi.ref('startDate')).messages({
      "date.min": "End date cannot be before start date"
    }),
    minAmount: Joi.number().min(0).messages({
      "number.base": "Minimum amount must be a number",
      "number.min": "Minimum amount cannot be negative"
    }),
    maxAmount: Joi.number().min(Joi.ref('minAmount')).messages({
      "number.base": "Maximum amount must be a number",
      "number.min": "Maximum amount cannot be less than minimum amount"
    }),
    status: Joi.string().valid("Pending", "Paid", "Overdue", "Cancelled", "Partially Paid")
  }),

  /**
   * Validation schema for invoice summary
   */
  invoiceSummary: Joi.object({
    startDate: Joi.date().required().messages({
      "any.required": "Start date is required"
    }),
    endDate: Joi.date().min(Joi.ref('startDate')).required().messages({
      "date.min": "End date cannot be before start date",
      "any.required": "End date is required"
    })
  })
};
