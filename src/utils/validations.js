/**
 * Comprehensive Validation System for Application Forms
 * Follows DRY, KISS principles with scalability and modularity in mind
 * 
 * Usage Examples:
 * - Basic validation: EmailValidation.basic()
 * - Component-specific: EmailValidation.signUp()
 * - Custom validation: PasswordValidation.custom({ minLength: 10 })
 */

import * as Yup from 'yup'

// =============================================================================
// VALIDATION PATTERNS & MESSAGES
// =============================================================================

const REGEX_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: {
    BASIC: /^.{6,}$/,
    MEDIUM: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  },
  PHONE: {
    INTERNATIONAL: /^\+?[1-9]\d{1,14}$/,
    US: /^(\+1|1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/,
    BASIC: /^[0-9]{10,15}$/
  },
  NAME: /^[a-zA-Z\s'-]{2,50}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  ALPHANUMERIC: /^[a-zA-Z0-9\s]+$/,
  NUMERIC: /^[0-9]+$/,
  POSTAL_CODE: {
    US: /^\d{5}(-\d{4})?$/,
    UK: /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i,
    CANADA: /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i,
    GENERAL: /^[A-Z0-9\s-]{3,10}$/i
  },
  OTP: /^[A-Z0-9]{6}$/
}

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_FORMAT: 'Invalid format',
  EMAIL: {
    BASIC: 'Please enter a valid email address',
    SIGNUP: 'Email must be valid and accessible for verification',
    LOGIN: 'Please enter your registered email address',
    BUSINESS: 'Please enter a valid business email address'
  },
  PASSWORD: {
    BASIC: 'Password must be at least 6 characters long',
    MEDIUM: 'Password must be at least 8 characters with uppercase, lowercase, and number',
    STRONG: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
    CONFIRM: 'Passwords do not match',
    CURRENT: 'Current password is required',
    NEW: 'New password must be different from current password'
  },
  NAME: {
    BASIC: 'Name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes',
    FIRST: 'First name is required and must be valid',
    LAST: 'Last name is required and must be valid',
    FULL: 'Please enter your full name'
  },
  PHONE: {
    BASIC: 'Phone number must be 10-15 digits',
    INTERNATIONAL: 'Please enter a valid international phone number',
    US: 'Please enter a valid US phone number',
    REQUIRED: 'Phone number is required'
  },
  URL: {
    BASIC: 'Please enter a valid URL',
    WEBSITE: 'Please enter a valid website URL (http:// or https://)',
    REQUIRED: 'Website URL is required'
  },
  LENGTH: {
    MIN: (min) => `Must be at least ${min} characters`,
    MAX: (max) => `Must not exceed ${max} characters`,
    EXACT: (length) => `Must be exactly ${length} characters`
  },
  OTP: {
    BASIC: 'Please enter a valid 6-character verification code',
    REQUIRED: 'Verification code is required',
    INVALID: 'Invalid verification code. Please check and try again',
    EXPIRED: 'Verification code has expired. Please request a new one'
  },
  BUSINESS: {
    COMPANY: 'Company name is required',
    JOB_TITLE: 'Job title is required',
    ADDRESS: 'Address is required',
    COUNTRY: 'Country selection is required'
  }
}

// =============================================================================
// VALIDATION BUILDER CLASS
// =============================================================================

class ValidationBuilder {
  constructor() {
    this.validations = {}
  }

  addValidation(name, config) {
    this.validations[name] = {
      pattern: config.pattern,
      message: config.message,
      required: config.required || false,
      transform: config.transform || null
    }
    return this
  }

  basic(pattern, message, required = true) {
    return this.addValidation('basic', { pattern, message, required })
  }

  custom(name, pattern, message, required = true) {
    return this.addValidation(name, { pattern, message, required })
  }

  build() {
    return this.validations
  }
}

// =============================================================================
// VALIDATION FACTORIES
// =============================================================================

/**
 * Email Validation Factory
 * Provides different validation levels for email fields
 */
export const EmailValidation = (() => {
  const validations = new ValidationBuilder()
    .basic(REGEX_PATTERNS.EMAIL, ERROR_MESSAGES.EMAIL.BASIC, true)
    .custom('signUp', REGEX_PATTERNS.EMAIL, ERROR_MESSAGES.EMAIL.SIGNUP, true)
    .custom('signIn', REGEX_PATTERNS.EMAIL, ERROR_MESSAGES.EMAIL.LOGIN, true)
    .custom('business', REGEX_PATTERNS.EMAIL, ERROR_MESSAGES.EMAIL.BUSINESS, true)
    .build()

  return {
    basic: () => validations.basic,
    signUp: () => validations.signUp,
    signIn: () => validations.signIn,
    business: () => validations.business,
    custom: (config = {}) => ({
      pattern: config.pattern || REGEX_PATTERNS.EMAIL,
      message: config.message || ERROR_MESSAGES.EMAIL.BASIC,
      required: config.required !== false
    })
  }
})()

/**
 * Password Validation Factory
 * Supports multiple strength levels and scenarios
 */
export const PasswordValidation = (() => {
  const validations = new ValidationBuilder()
    .basic(REGEX_PATTERNS.PASSWORD.BASIC, ERROR_MESSAGES.PASSWORD.BASIC, true)
    .custom('medium', REGEX_PATTERNS.PASSWORD.MEDIUM, ERROR_MESSAGES.PASSWORD.MEDIUM, true)
    .custom('strong', REGEX_PATTERNS.PASSWORD.STRONG, ERROR_MESSAGES.PASSWORD.STRONG, true)
    .custom('confirm', null, ERROR_MESSAGES.PASSWORD.CONFIRM, true)
    .build()

  return {
    basic: () => validations.basic,
    medium: () => validations.medium,
    strong: () => validations.strong,
    confirm: (originalPassword) => ({
      pattern: null,
      message: ERROR_MESSAGES.PASSWORD.CONFIRM,
      required: true,
      validate: (value) => value === originalPassword
    }),
    custom: (config = {}) => ({
      pattern: config.pattern || REGEX_PATTERNS.PASSWORD.BASIC,
      message: config.message || ERROR_MESSAGES.PASSWORD.BASIC,
      required: config.required !== false,
      minLength: config.minLength || 6
    })
  }
})()

/**
 * Name Validation Factory
 * Handles first name, last name, and full name scenarios
 */
export const NameValidation = (() => {
  const validations = new ValidationBuilder()
    .basic(REGEX_PATTERNS.NAME, ERROR_MESSAGES.NAME.BASIC, true)
    .custom('firstName', REGEX_PATTERNS.NAME, ERROR_MESSAGES.NAME.FIRST, true)
    .custom('lastName', REGEX_PATTERNS.NAME, ERROR_MESSAGES.NAME.LAST, true)
    .custom('fullName', REGEX_PATTERNS.NAME, ERROR_MESSAGES.NAME.FULL, true)
    .build()

  return {
    basic: () => validations.basic,
    firstName: () => validations.firstName,
    lastName: () => validations.lastName,
    fullName: () => validations.fullName,
    custom: (config = {}) => ({
      pattern: config.pattern || REGEX_PATTERNS.NAME,
      message: config.message || ERROR_MESSAGES.NAME.BASIC,
      required: config.required !== false,
      minLength: config.minLength || 2,
      maxLength: config.maxLength || 50
    })
  }
})()

/**
 * Phone Validation Factory
 * Supports different regional formats
 */
export const PhoneValidation = (() => {
  const validations = new ValidationBuilder()
    .basic(REGEX_PATTERNS.PHONE.BASIC, ERROR_MESSAGES.PHONE.BASIC, true)
    .custom('international', REGEX_PATTERNS.PHONE.INTERNATIONAL, ERROR_MESSAGES.PHONE.INTERNATIONAL, true)
    .custom('us', REGEX_PATTERNS.PHONE.US, ERROR_MESSAGES.PHONE.US, true)
    .build()

  return {
    basic: () => validations.basic,
    international: () => validations.international,
    us: () => validations.us,
    custom: (config = {}) => ({
      pattern: config.pattern || REGEX_PATTERNS.PHONE.BASIC,
      message: config.message || ERROR_MESSAGES.PHONE.BASIC,
      required: config.required !== false
    })
  }
})()

/**
 * URL Validation Factory
 * For website URLs and other web addresses
 */
export const UrlValidation = (() => {
  const validations = new ValidationBuilder()
    .basic(REGEX_PATTERNS.URL, ERROR_MESSAGES.URL.BASIC, true)
    .custom('website', REGEX_PATTERNS.URL, ERROR_MESSAGES.URL.WEBSITE, true)
    .build()

  return {
    basic: () => validations.basic,
    website: () => validations.website,
    custom: (config = {}) => ({
      pattern: config.pattern || REGEX_PATTERNS.URL,
      message: config.message || ERROR_MESSAGES.URL.BASIC,
      required: config.required !== false
    })
  }
})()

/**
 * Text Validation Factory
 * For general text fields with length constraints
 */
export const TextValidation = (() => {
  return {
    basic: (minLength = 1, maxLength = 255) => ({
      pattern: null,
      message: `Must be between ${minLength} and ${maxLength} characters`,
      required: true,
      minLength,
      maxLength
    }),
    required: (message = ERROR_MESSAGES.REQUIRED) => ({
      pattern: null,
      message,
      required: true
    }),
    optional: (minLength = 0, maxLength = 255) => ({
      pattern: null,
      message: maxLength ? `Must not exceed ${maxLength} characters` : null,
      required: false,
      minLength,
      maxLength
    }),
    alphanumeric: () => ({
      pattern: REGEX_PATTERNS.ALPHANUMERIC,
      message: 'Only letters, numbers, and spaces are allowed',
      required: true
    }),
    numeric: () => ({
      pattern: REGEX_PATTERNS.NUMERIC,
      message: 'Only numbers are allowed',
      required: true
    }),
    custom: (config = {}) => ({
      pattern: config.pattern || null,
      message: config.message || ERROR_MESSAGES.REQUIRED,
      required: config.required !== false,
      minLength: config.minLength || 0,
      maxLength: config.maxLength || 255
    })
  }
})()

/**
 * Business Validation Factory
 * For business-related form fields
 */
export const BusinessValidation = (() => {
  return {
    companyName: () => ({
      pattern: REGEX_PATTERNS.ALPHANUMERIC,
      message: ERROR_MESSAGES.BUSINESS.COMPANY,
      required: true,
      minLength: 2,
      maxLength: 100
    }),
    jobTitle: () => ({
      pattern: REGEX_PATTERNS.ALPHANUMERIC,
      message: ERROR_MESSAGES.BUSINESS.JOB_TITLE,
      required: true,
      minLength: 2,
      maxLength: 100
    }),
    address: () => ({
      pattern: null,
      message: ERROR_MESSAGES.BUSINESS.ADDRESS,
      required: true,
      minLength: 10,
      maxLength: 255
    }),
    country: () => ({
      pattern: null,
      message: ERROR_MESSAGES.BUSINESS.COUNTRY,
      required: true
    }),
    marketingChannel: () => ({
      pattern: null,
      message: 'Please select how you heard about us',
      required: true
    })
  }
})()

/**
 * OTP Validation Factory
 * For One-Time Password verification codes
 */
export const OTPValidation = (() => {
  return {
    basic: () => ({
      pattern: REGEX_PATTERNS.OTP,
      message: ERROR_MESSAGES.OTP.BASIC,
      required: true,
      minLength: 6,
      maxLength: 6
    }),
    required: () => ({
      pattern: REGEX_PATTERNS.OTP,
      message: ERROR_MESSAGES.OTP.REQUIRED,
      required: true,
      minLength: 6,
      maxLength: 6
    })
  }
})()

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Validates a single field against its validation rules
 * @param {any} value - The value to validate
 * @param {Object} validation - The validation configuration
 * @returns {string|null} Error message or null if valid
 */
export const validateField = (value, validation) => {
  if (!value && validation.required) {
    return validation.message || ERROR_MESSAGES.REQUIRED
  }

  if (!value && !validation.required) {
    return null // Optional field, empty is valid
  }

  if (validation.pattern && !validation.pattern.test(value)) {
    return validation.message
  }

  if (validation.minLength && value.length < validation.minLength) {
    return ERROR_MESSAGES.LENGTH.MIN(validation.minLength)
  }

  if (validation.maxLength && value.length > validation.maxLength) {
    return ERROR_MESSAGES.LENGTH.MAX(validation.maxLength)
  }

  if (validation.validate && !validation.validate(value)) {
    return validation.message
  }

  return null
}

/**
 * Creates Yup schema from validation configuration
 * @param {Object} validationConfig - Object containing field validations
 * @returns {Object} Yup validation schema
 */
export const createYupSchema = (validationConfig) => {
  const schema = {}

  Object.keys(validationConfig).forEach(field => {
    const validation = validationConfig[field]
    let yupField = Yup.string()

    if (validation.required) {
      yupField = yupField.required(validation.message || ERROR_MESSAGES.REQUIRED)
    }

    if (validation.minLength) {
      yupField = yupField.min(validation.minLength, ERROR_MESSAGES.LENGTH.MIN(validation.minLength))
    }

    if (validation.maxLength) {
      yupField = yupField.max(validation.maxLength, ERROR_MESSAGES.LENGTH.MAX(validation.maxLength))
    }

    if (validation.pattern) {
      yupField = yupField.matches(validation.pattern, validation.message)
    }

    if (validation.validate) {
      yupField = yupField.test('custom', validation.message, validation.validate)
    }

    schema[field] = yupField
  })

  return Yup.object().shape(schema)
}

/**
 * Pre-built validation schemas for common forms
 */
export const ValidationSchemas = {
  signIn: () => createYupSchema({
    email: EmailValidation.signIn(),
    password: PasswordValidation.basic()
  }),

  signUp: () => createYupSchema({
    first_name: NameValidation.firstName(),
    last_name: NameValidation.lastName(),
    email: EmailValidation.signUp(),
    password: PasswordValidation.medium(),
    website_url: UrlValidation.website(),
    address: BusinessValidation.address(),
    country: BusinessValidation.country(),
    company_name: BusinessValidation.companyName(),
    job_title: BusinessValidation.jobTitle(),
    marketing_channel: BusinessValidation.marketingChannel()
  }),

  profile: () => createYupSchema({
    firstName: NameValidation.firstName(),
    lastName: NameValidation.lastName(),
    email: EmailValidation.basic(),
    phone: PhoneValidation.basic()
  }),

  changePassword: (currentPassword) => createYupSchema({
    currentPassword: PasswordValidation.basic(),
    newPassword: PasswordValidation.medium(),
    confirmPassword: PasswordValidation.confirm(currentPassword)
  }),

  otpVerification: () => createYupSchema({
    otp: OTPValidation.basic()
  })
}

// =============================================================================
// EXPORTS
// =============================================================================

export {
  REGEX_PATTERNS,
  ERROR_MESSAGES,
  ValidationBuilder
}

export default {
  Email: EmailValidation,
  Password: PasswordValidation,
  Name: NameValidation,
  Phone: PhoneValidation,
  Url: UrlValidation,
  Text: TextValidation,
  Business: BusinessValidation,
  Schemas: ValidationSchemas,
  Utils: {
    validateField,
    createYupSchema
  }
}

/* =============================================================================
   USAGE EXAMPLES & DOCUMENTATION
   =============================================================================

   1. USING PRE-BUILT SCHEMAS:
   ---------------------------
   import { ValidationSchemas } from '@/utils/validations'
   
   const validationSchema = ValidationSchemas.signIn()
   // or
   const signUpSchema = ValidationSchemas.signUp()

   2. USING INDIVIDUAL VALIDATIONS:
   --------------------------------
   import { EmailValidation, PasswordValidation } from '@/utils/validations'
   
   const emailRule = EmailValidation.basic()
   const passwordRule = PasswordValidation.strong()
   
   // Custom Yup schema
   const schema = Yup.object({
     email: Yup.string().matches(emailRule.pattern, emailRule.message),
     password: Yup.string().matches(passwordRule.pattern, passwordRule.message)
   })

   3. CUSTOM VALIDATIONS:
   ----------------------
   const customEmail = EmailValidation.custom({
     pattern: /^[a-z]+@company\.com$/,
     message: 'Only company emails allowed'
   })

   4. FORM-SPECIFIC VALIDATIONS:
   -----------------------------
   // For sign-up forms
   const signUpEmail = EmailValidation.signUp()
   
   // For business forms
   const companyValidation = BusinessValidation.companyName()

   5. VALIDATION UTILITY FUNCTIONS:
   --------------------------------
   import { validateField } from '@/utils/validations'
   
   const error = validateField('test@email.com', EmailValidation.basic())
   console.log(error) // null if valid, error message if invalid

   6. EXTENDING THE SYSTEM:
   ------------------------
   // Add new validation type
   export const CustomValidation = (() => {
     return {
       basic: () => ({
         pattern: /custom-pattern/,
         message: 'Custom error message',
         required: true
       })
     }
   })()

   7. INTEGRATION WITH FORMIK:
   ---------------------------
   const formik = useFormik({
     initialValues: { email: '', password: '' },
     validationSchema: ValidationSchemas.signIn(),
     onSubmit: (values) => {
       // Handle form submission
     }
   })

   8. CONDITIONAL VALIDATIONS:
   ---------------------------
   const conditionalSchema = Yup.object({
     userType: Yup.string().required(),
     businessEmail: Yup.string().when('userType', {
       is: 'business',
       then: Yup.string().matches(
         EmailValidation.business().pattern,
         EmailValidation.business().message
       ).required()
     })
   })

============================================================================= */