import { GroupNameErrors } from '../enums';

const VALIDATION_REGEXP = {
  [GroupNameErrors.onlyLettersOrDigitsOrSpaces]: /^[a-zA-Z0-9 ]*$/
};

const ERROR_NAME_GROUP_MESSAGE = {
  [GroupNameErrors.required]: 'Please enter a name',
  [GroupNameErrors.onlyLettersOrDigitsOrSpaces]: 'Your name allowed only letters, digits or spaces',
  [GroupNameErrors.maxLengthName]: 'Your name is too long'
};

export { ERROR_NAME_GROUP_MESSAGE, VALIDATION_REGEXP };
