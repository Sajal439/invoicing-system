import Joi from "joi";

/**
 * Validation schemas for authentication-related operations
 */
export const authValidation = {
  /**
   * Validation schema for user registration
   */
  register: Joi.object({
    name: Joi.string().trim().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required"
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required"
    }),
    password: Joi.string().min(8).required().messages({
      "string.min": "Password must be at least 8 characters long",
      "string.empty": "Password is required",
      "any.required": "Password is required"
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      "any.only": "Passwords do not match",
      "string.empty": "Confirm password is required",
      "any.required": "Confirm password is required"
    }),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).messages({
      "string.pattern.base": "Phone number must be 10 digits"
    }),
    address: Joi.string().allow("", null)
  }),

  /**
   * Validation schema for user login
   */
  login: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required"
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required"
    })
  }),

  /**
   * Validation schema for updating user role
   */
  updateRole: Joi.object({
    role: Joi.string().valid("admin", "worker", "manager").required().messages({
      "any.only": "Role must be one of: admin, worker, manager",
      "string.empty": "Role is required",
      "any.required": "Role is required"
    })
  }),

  /**
   * Validation schema for changing password
   */
  changePassword: Joi.object({
    currentPassword: Joi.string().required().messages({
      "string.empty": "Current password is required",
      "any.required": "Current password is required"
    }),
    newPassword: Joi.string().min(8).required().messages({
      "string.min": "New password must be at least 8 characters long",
      "string.empty": "New password is required",
      "any.required": "New password is required"
    }),
    confirmNewPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
      "any.only": "Passwords do not match",
      "string.empty": "Confirm new password is required",
      "any.required": "Confirm new password is required"
    })
  }),

  /**
   * Validation schema for forgot password
   */
  forgotPassword: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required"
    })
  }),

  /**
   * Validation schema for reset password
   */
  resetPassword: Joi.object({
    token: Joi.string().required().messages({
      "string.empty": "Token is required",
      "any.required": "Token is required"
    }),
    password: Joi.string().min(8).required().messages({
      "string.min": "Password must be at least 8 characters long",
      "string.empty": "Password is required",
      "any.required": "Password is required"
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      "any.only": "Passwords do not match",
      "string.empty": "Confirm password is required",
      "any.required": "Confirm password is required"
    })
  })
};
