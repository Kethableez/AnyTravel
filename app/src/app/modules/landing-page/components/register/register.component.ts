import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormService } from 'src/app/core/services/form.service';

@Component({
  selector: 'majk-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [FormService]
})
export class RegisterComponent {
  constructor(private builder: FormBuilder, protected formService: FormService) {}

  registerForm = this.builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  isFieldValid(fieldName: string) {
    return this.formService.isFieldValid(fieldName, this.registerForm);
  }
}
