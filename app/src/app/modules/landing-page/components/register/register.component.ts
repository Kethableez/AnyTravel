import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AvailabilityValidator } from 'src/app/core/validators/availability.validator';
import { FormService } from 'src/app/core/services/form.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { RootState } from 'src/app/core/store/app.states';
import { UserActions } from 'src/app/core/store/user';

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

  isFieldValid(fieldName: string) {
    return this.formService.isFieldValid(fieldName, this.registerForm);
  }

  register() {
    const payload = this.registerForm.value;
    this.store$.dispatch(UserActions.register({ registerPayload: payload }));
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
