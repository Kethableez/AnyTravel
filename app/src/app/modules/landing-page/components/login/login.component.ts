import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormService } from 'src/app/core/services/form.service';

@Component({
  selector: 'majk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormService]
})
export class LoginComponent {
  constructor(private builder: FormBuilder, protected formService: FormService) {}

  loginForm = this.builder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  isFieldValid(fieldName: string) {
    return this.formService.isFieldValid(fieldName, this.loginForm);
  }
}
