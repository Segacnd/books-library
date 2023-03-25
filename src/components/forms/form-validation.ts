import * as yup from 'yup';

export const formValidationErrors = {
  password: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
  username: 'Используйте для логина латинский алфавит и цифры',
  phone: 'В формате +375 (xx) xxx-xx-xx',
};

const requiredError = 'Поле не может быть пустым';

const emailRules = {
  pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
};

const phoneRules = {
  pattern: /^[+]375\s[(]?(29|33|25|44)[)]?\s[0-9]{3}-[0-9]{2}-[0-9]{2}/gm,
};

const stringRules = {
  latinPattern: /((?=.*[a-z]){1})/,
  numberPattern: /(?=.*\d)/,
  bigLetter: /((?=.*[A-Z]){1})/,
};

const loginRules = {
  latinPattern: /((?=.*[a-z]){1})|((?=.*[A-Z]){1})/,
  numberPattern: /(?=.*\d)/,
};

const isRequiredString = yup.string().required(requiredError);

export const phoneSchema = yup.string().matches(phoneRules.pattern, formValidationErrors.phone);

export const phoneRequiredSchema = yup
  .string()
  .required(requiredError)
  .notOneOf(['+375 (xx) xxx-xx-xx'], requiredError)
  .matches(phoneRules.pattern, 'В формате +375 (xx) xxx-xx-xx');

export const mailSchema = yup.string().required(requiredError).matches(emailRules.pattern, 'Введите корректный e-mail');

export const userNameSchema = yup
  .string()
  .required(requiredError)
  .matches(loginRules.latinPattern, 'латинский алфавит')
  .matches(loginRules.numberPattern, 'цифры');

export const textSchema = yup.string();
export const textRequiredSchema = textSchema.concat(isRequiredString);

export const passwordSchema = yup
  .string()
  .required(requiredError)
  .min(8, 'не менее 8 символов')
  .matches(stringRules.bigLetter, 'заглавной буквой')
  .matches(stringRules.numberPattern, 'цифрой');

export const confirmPasswordSchema = yup
  .string()
  .required(requiredError)
  .oneOf([yup.ref('password'), ''], 'Пароли не совпадают');
