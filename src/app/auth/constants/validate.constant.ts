import { AuthEmailErrors, AuthErrors, AuthNameErrors, AuthPasswordErrors } from '../enums';

const VALIDATION_REGEXP = {
  [AuthErrors.symbolRequired]: /[@!#?]+/,
  [AuthErrors.upperCaseRequired]: /[A-Z]+/,
  [AuthErrors.numericRequired]: /[0-9]+/,
  [AuthNameErrors.onlyLettersOrSpaces]: /^[A-Za-z\s]+$/
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

const ERROR_NAME_MESSAGE = {
  [AuthNameErrors.required]: 'Please enter a name',
  [AuthNameErrors.onlyLettersOrSpaces]: 'Your name allowed only letters or spaces',
  [AuthNameErrors.maxLengthName]: 'Your name is too long'
};

export { ERROR_EMAIL_MESSAGE, ERROR_NAME_MESSAGE, ERROR_PASSWORD_MESSAGE, ERRORS_MESSAGES, VALIDATION_REGEXP };
