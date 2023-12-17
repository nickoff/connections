import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { ERROR_NAME_GROUP_MESSAGE, VALIDATION_REGEXP } from '../constants';
import { GroupNameErrors } from '../enums';

const maxLengthPassword = 30;

export function validateGroupName(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (!value) return null;

    const errors: ValidationErrors = {};
    const conditions = [
      {
        test: VALIDATION_REGEXP.onlyLettersOrDigitsOrSpaces.test(value),
        error: GroupNameErrors.onlyLettersOrDigitsOrSpaces
      },
      { test: value.length < maxLengthPassword, error: GroupNameErrors.maxLengthName }
    ];

    conditions.forEach((condition) => {
      if (!condition.test) {
        errors[condition.error] = ERROR_NAME_GROUP_MESSAGE[condition.error];
      }
    });

    return Object.keys(errors).length ? errors : null;
  };
}
