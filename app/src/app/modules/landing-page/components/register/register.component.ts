import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormService } from 'src/app/core/services/form.service';
import { RootState } from 'src/app/core/store/app.states';
import { AuthActions } from 'src/app/core/store/auth';

@Component({
  selector: 'majk-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [FormService]
})
export class RegisterComponent {
  constructor(private builder: FormBuilder, protected formService: FormService, private store$: Store<RootState>) {}

  registerForm = this.builder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
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
