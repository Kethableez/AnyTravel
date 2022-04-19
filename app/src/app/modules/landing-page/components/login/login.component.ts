import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormName } from '@models/form-name.model';
import { FormService } from '@services/form.service';
import { RootState } from '@store/app.states';
import { AuthActions } from '@store/auth';

@Component({
  selector: 'majk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormService]
})
export class LoginComponent {
  constructor(private builder: FormBuilder, protected formService: FormService, private store$: Store<RootState>) {}

  loginForm = this.builder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get formName() {
    return FormName.LOGIN;
  }

  isFieldValid(fieldName: string) {
    return this.formService.isFieldValid(fieldName, this.loginForm);
  }

  login() {
    const payload = this.loginForm.value;

    this.store$.dispatch(AuthActions.login({ loginPayload: payload }));

    this.loginForm.reset(this.formService.getInitialForm(this.formName));
  }

  isErrorEnabled(fieldName: string) {
    return this.formService.errorEnabled(fieldName, this.loginForm);
  }

  getError(fieldName: string): string[] {
    return this.formService.getErrorKey(fieldName, this.loginForm);
  }
}
