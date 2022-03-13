import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, of } from 'rxjs';
import { FormService } from './form.service';
import { UserService } from './user/user.service';

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export function AvailabilityValidator(
  controlName: string,
  userService: UserService,
  formService: FormService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const value: string = control.value;
    if (control.pristine) {
      return of({ required: true });
    } else {
      if (controlName === 'email' && !value.match(emailRegexp)) {
        return of({ invalidEmail: true });
      } else if (value === '') {
        return of({ required: true });
      } else {
        formService.toggleLoading(controlName);
        const payload = {
          selector: controlName,
          value: control.value
        };
        return userService.doCheckAvailability(payload).pipe(
          map((response) => {
            formService.toggleLoading(controlName);

            return !response ? { taken: true } : null;
          })
        );
      }
    }
  };
}
