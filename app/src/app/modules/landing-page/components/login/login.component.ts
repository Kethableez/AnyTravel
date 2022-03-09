import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'majk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private builder: FormBuilder) {}

  loginForm = this.builder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  isPasswordValid() {
    if (this.password?.touched) {
      return this.password.valid ? 'is-primary' : 'is-danger';
    }
    return '';
  }

  isUsernameValid() {
    if (this.username?.touched) {
      return this.username.valid ? 'is-primary' : 'is-danger';
    }
    return '';
  }
}
