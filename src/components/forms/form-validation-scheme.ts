import * as yup from 'yup';

import {
  confirmPasswordSchema,
  mailSchema,
  passwordSchema,
  phoneRequiredSchema,
  phoneSchema,
  textRequiredSchema,
  textSchema,
  userNameSchema,
} from './form-validation';

export const forgotPasswordSchema = yup.object().shape({ email: mailSchema });
export const registrationFirstStepSchema = yup.object().shape({ username: userNameSchema, password: passwordSchema });
export const registrationSecondStepSchema = yup
  .object()
  .shape({ firstName: textRequiredSchema, lastName: textRequiredSchema });
export const registrationThirdStepSchema = yup.object().shape({ phone: phoneRequiredSchema, email: mailSchema });
export const loginSchema = yup.object().shape({ identifier: textRequiredSchema, password: textRequiredSchema });
export const resetPasswordSchema = yup
  .object()
  .shape({ password: passwordSchema, passwordConfirmation: confirmPasswordSchema });

export const editUserDetails = yup.object().shape({
  login: userNameSchema,
  password: passwordSchema,
  email: mailSchema,
  firstName: textSchema,
  lastName: textSchema,
  phone: phoneSchema,
});
