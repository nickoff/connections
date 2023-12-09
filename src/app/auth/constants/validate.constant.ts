import { AuthEmailErrors, AuthErrors, AuthPasswordErrors } from '../enums';

const VALIDATION_REGEXP = {
  [AuthErrors.symbolRequired]: /[@!#?]+/,
  [AuthErrors.upperCaseRequired]: /[A-Z]+/,
  [AuthErrors.numericRequired]: /[0-9]+/
};

const ERRORS_MESSAGES = {
  [AuthErrors.symbolRequired]: 'Symbol (@, !, #, ?) required',
  [AuthErrors.upperCaseRequired]: 'Uppercase letter required',
  [AuthErrors.numericRequired]: 'Number required',
  [AuthErrors.lengthRequired]: 'Password must be at least 8 characters long'
};

const ERROR_EMAIL_MESSAGE = {
  [AuthEmailErrors.required]: "Please enter a user's email",
  [AuthEmailErrors.invalidEmail]: 'Invalid type email'
};

const ERROR_PASSWORD_MESSAGE = {
  [AuthPasswordErrors.required]: 'Please enter a password',
  [AuthPasswordErrors.invalidPassword]: "Your password isn't strong enough"
};

export { ERROR_EMAIL_MESSAGE, ERROR_PASSWORD_MESSAGE, ERRORS_MESSAGES, VALIDATION_REGEXP };
