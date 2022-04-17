import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AvailabilityValidator } from '@validators/availability.validator';
import { FormService } from '@services/form.service';
import { UserService } from '@services/user/user.service';
import { RootState } from '@store/app.states';
import { UserActions } from '@store/user';
import { FormName } from '@models/form-name.model';

@Component({
  selector: 'majk-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [FormService]
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    protected formService: FormService,
    private store$: Store<RootState>,
    private userService: UserService
  ) {}

  registerForm = this.builder.group({
    username: [
      '',
      {
        Validators: [Validators.required],
        asyncValidators: [AvailabilityValidator('username', this.userService, this.formService)],
        updateOn: 'blur'
      }
    ],
    email: [
      '',
      {
        Validators: [Validators.required],
        asyncValidators: [AvailabilityValidator('email', this.userService, this.formService)],
        updateOn: 'blur'
      }
    ],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthdate: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    isSubscribed: [false, Validators.required]
  });

  get formName() {
    return FormName.REGISTER;
  }

  isFieldValid(fieldName: string) {
    return this.formService.isFieldValid(fieldName, this.registerForm);
  }

  register() {
    const payload = this.registerForm.value;
    this.store$.dispatch(UserActions.register({ registerPayload: payload }));
    this.registerForm.reset(this.formService.getInitialForm(this.formName));
  }

  isErrorEnabled(fieldName: string) {
    return this.formService.errorEnabled(fieldName, this.registerForm);
  }

  getError(fieldName: string): string[] {
    return this.formService.getErrorKey(fieldName, this.registerForm);
  }

  isPasswordMatch() {
    const password = this.getControl('password').value;
    const confirmPassword = this.getControl('confirmPassword').value;
    if (password !== confirmPassword) {
      this.getControl('confirmPassword').setErrors({ mustMatch: true });
    }
  }

  getControl(controlName: string) {
    return this.registerForm.controls[controlName];
  }
}
