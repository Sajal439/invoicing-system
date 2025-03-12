import Joi from "joi";

/**
 * Validation schemas for party-related operations
 */
export const partyValidation = {
  /**
   * Validation schema for creating a party
   */
  createParty: Joi.object({
    name: Joi.string().trim().required().messages({
      "string.empty": "Party name is required",
      "any.required": "Party name is required"
    }),
    type: Joi.string().valid("Customer", "Vendor", "Both").required().messages({
      "any.only": "Type must be one of: Customer, Vendor, Both",
      "string.empty": "Type is required",
      "any.required": "Type is required"
    }),
    contactPerson: Joi.string().trim().allow("", null),
    email: Joi.string().email().allow("", null).messages({
      "string.email": "Please provide a valid email"
    }),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).allow("", null).messages({
      "string.pattern.base": "Phone number must be 10 digits"
    }),
    alternatePhone: Joi.string().pattern(/^[0-9]{10}$/).allow("", null).messages({
      "string.pattern.base": "Alternate phone number must be 10 digits"
    }),
    address: Joi.string().allow("", null),
    city: Joi.string().trim().allow("", null),
    state: Joi.string().trim().allow("", null),
    pincode: Joi.string().pattern(/^[0-9]{6}$/).allow("", null).messages({
      "string.pattern.base": "Pincode must be 6 digits"
    }),
    gstin: Joi.string().pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).allow("", null).messages({
      "string.pattern.base": "GSTIN must be in valid format"
    }),
    panNumber: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).allow("", null).messages({
      "string.pattern.base": "PAN number must be in valid format"
    }),
    openingBalance: Joi.number().default(0).messages({
      "number.base": "Opening balance must be a number"
    }),
    balanceType: Joi.string().valid("Debit", "Credit").default("Debit").messages({
      "any.only": "Balance type must be one of: Debit, Credit"
    }),
    creditLimit: Joi.number().min(0).default(0).messages({
      "number.base": "Credit limit must be a number",
      "number.min": "Credit limit cannot be negative"
    }),
    creditPeriod: Joi.number().integer().min(0).default(0).messages({
      "number.base": "Credit period must be a number",
      "number.integer": "Credit period must be an integer",
      "number.min": "Credit period cannot be negative"
    }),
    notes: Joi.string().allow("", null)
  }),

  /**
   * Validation schema for updating a party
   */
  updateParty: Joi.object({
    name: Joi.string().trim().messages({
      "string.empty": "Party name cannot be empty"
    }),
    type: Joi.string().valid("Customer", "Vendor", "Both").messages({
      "any.only": "Type must be one of: Customer, Vendor, Both"
    }),
    contactPerson: Joi.string().trim().allow("", null),
    email: Joi.string().email().allow("", null).messages({
      "string.email": "Please provide a valid email"
    }),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).allow("", null).messages({
      "string.pattern.base": "Phone number must be 10 digits"
    }),
    alternatePhone: Joi.string().pattern(/^[0-9]{10}$/).allow("", null).messages({
      "string.pattern.base": "Alternate phone number must be 10 digits"
    }),
    address: Joi.string().allow("", null),
    city: Joi.string().trim().allow("", null),
    state: Joi.string().trim().allow("", null),
    pincode: Joi.string().pattern(/^[0-9]{6}$/).allow("", null).messages({
      "string.pattern.base": "Pincode must be 6 digits"
    }),
    gstin: Joi.string().pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).allow("", null).messages({
      "string.pattern.base": "GSTIN must be in valid format"
    }),
    panNumber: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).allow("", null).messages({
      "string.pattern.base": "PAN number must be in valid format"
    }),
    openingBalance: Joi.number().messages({
      "number.base": "Opening balance must be a number"
    }),
    balanceType: Joi.string().valid("Debit", "Credit").messages({
      "any.only": "Balance type must be one of: Debit, Credit"
    }),
    creditLimit: Joi.number().min(0).messages({
      "number.base": "Credit limit must be a number",
      "number.min": "Credit limit cannot be negative"
    }),
    creditPeriod: Joi.number().integer().min(0).messages({
      "number.base": "Credit period must be a number",
      "number.integer": "Credit period must be an integer",
      "number.min": "Credit period cannot be negative"
    }),
    notes: Joi.string().allow("", null)
  }),

  /**
   * Validation schema for party filters
   */
  partyFilters: Joi.object({
    type: Joi.string().valid("Customer", "Vendor", "Both"),
    name: Joi.string().trim(),
    city: Joi.string().trim()
  })
};
