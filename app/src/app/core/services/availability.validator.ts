import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { delay, map, of } from 'rxjs';
import { FormService } from './form.service';
import { UserService } from './user/user.service';

export function AvailabilityValidator(
  controlName: string,
  userService: UserService,
  formService: FormService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    formService.toggleLoading(controlName);
    const value = control.value;

    if (value === '') {
      return of({ taken: true });
    } else {
      const payload = {
        selector: controlName,
        value: control.value
      };
      return userService.doCheckAvailability(payload).pipe(
        delay(2000),
        map((response) => {
          formService.toggleLoading(controlName);

          return !response ? { taken: true } : null;
        })
      );
    }
  };
}
