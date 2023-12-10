import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { ERROR_NAME_MESSAGE, VALIDATION_REGEXP } from '../constants';
import { AuthNameErrors } from '../enums';

const maxLengthPassword = 40;

export function validateName(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (!value) return null;

    const errors: ValidationErrors = {};
    const conditions = [
      { test: VALIDATION_REGEXP.onlyLettersOrSpaces.test(value), error: AuthNameErrors.onlyLettersOrSpaces },
      { test: value.length < maxLengthPassword, error: AuthNameErrors.maxLengthName }
    ];

    conditions.forEach((condition) => {
      if (!condition.test) {
        errors[condition.error] = ERROR_NAME_MESSAGE[condition.error];
      }
    });

    return Object.keys(errors).length ? errors : null;
  };
}
