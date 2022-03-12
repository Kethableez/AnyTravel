import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AvailabilityPayload } from 'src/app/core/models/user/availability-payload';
import { AvailabilityValidator } from 'src/app/core/services/availability.validator';
import { FormService, StyleSelector } from 'src/app/core/services/form.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { RootState } from 'src/app/core/store/app.states';
import { AuthActions } from 'src/app/core/store/auth';

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
    username: ['', Validators.required],
    email: [
      '',
      {
        Validators: [Validators.required, Validators.email],
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
    this.store$.dispatch(AuthActions.register({ registerPayload: payload }));
  }
}
