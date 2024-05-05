import * as yup from "yup"

export const stringValidator = yup
  .string()
  .min(2)
  .required()

export const notRequiredStringValidator = yup
  .string()
  .min(2)

export const averagePriceValidator = yup
  .number()
  .min(1)
  .max(5)
  
export const starsValidator = yup
  .number()
  .min(1)
  .max(3)

export const numberValidator = yup
  .number()
  .required()
  .min(1)

export const numberPriceValidator = yup
  .number()

export const booleanValidator = yup
  .boolean()
  .default(false)