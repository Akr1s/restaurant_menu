import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkEmptyString(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!value) {
      return null;
    }

    const trimmedString = value.trim();

    return !trimmedString ? { emptyString: true } : null;
  };
}
