import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'majk-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private builder: FormBuilder) {}

  registerForm = this.builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  isFieldValid(fieldName: string) {
    const field = this.registerForm.get(fieldName);

    if (field?.touched) {
      return field.valid ? 'is-primary' : 'is-danger';
    }
    return '';
  }
}
