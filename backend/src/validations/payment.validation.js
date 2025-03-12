import Joi from "joi";

/**
 * Validation schemas for payment-related operations
 */
export const paymentValidation = {
  /**
   * Validation schema for creating a payment
   */
  createPayment: Joi.object({
    invoiceId: Joi.string().trim().required().messages({
      "string.empty": "Invoice ID is required",
      "any.required": "Invoice ID is required"
    }),
    amount: Joi.number().min(0.01).required().messages({
      "number.base": "Amount must be a number",
      "number.min": "Amount must be greater than 0",
      "any.required": "Amount is required"
    }),
    paymentMethod: Joi.string().valid(
      "Cash", 
      "Bank Transfer", 
      "Credit Card", 
      "Debit Card", 
      "UPI", 
      "Cheque", 
      "Other"
    ).required().messages({
      "any.only": "Payment method must be one of: Cash, Bank Transfer, Credit Card, Debit Card, UPI, Cheque, Other",
      "string.empty": "Payment method is required",
      "any.required": "Payment method is required"
    }),
    paymentDate: Joi.date().default(Date.now),
    status: Joi.string().valid("Pending", "Completed", "Failed", "Refunded").default("Completed"),
    transactionId: Joi.string().allow("", null),
    notes: Joi.string().allow("", null),
    receivedBy: Joi.string().trim()
  }),

  /**
   * Validation schema for updating payment status
   */
  updateStatus: Joi.object({
    status: Joi.string().valid("Pending", "Completed", "Failed", "Refunded").required().messages({
      "any.only": "Status must be one of: Pending, Completed, Failed, Refunded",
      "string.empty": "Status is required",
      "any.required": "Status is required"
    })
  }),

  /**
   * Validation schema for payment filters
   */
  paymentFilters: Joi.object({
    invoiceId: Joi.string().trim(),
    paymentMethod: Joi.string().valid(
      "Cash", 
      "Bank Transfer", 
      "Credit Card", 
      "Debit Card", 
      "UPI", 
      "Cheque", 
      "Other"
    ),
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
    })
  }),

  /**
   * Validation schema for payment summary
   */
  paymentSummary: Joi.object({
    startDate: Joi.date().required().messages({
      "any.required": "Start date is required"
    }),
    endDate: Joi.date().min(Joi.ref('startDate')).required().messages({
      "date.min": "End date cannot be before start date",
      "any.required": "End date is required"
    })
  })
};
