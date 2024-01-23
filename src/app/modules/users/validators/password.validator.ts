import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function changePasswordValidator(): ValidatorFn {
  return (group: FormGroup): ValidationErrors | null => {
    const newPassword = group.controls['newPassword'];
    const confirmPassword = group.controls['confirmPassword'];

    if (!newPassword.value || !confirmPassword.value) {
      return { matchPassword: false };
    }
    console.log(group);
    const passwordValid = newPassword.value == confirmPassword.value;

    console.log(passwordValid);
    return passwordValid ? { matchPassword: true } : { matchPassword: false };
  };
}
