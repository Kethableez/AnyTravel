import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormService } from 'src/app/core/services/form.service';
import { RootState } from 'src/app/core/store/app.states';
import { AuthActions } from 'src/app/core/store/auth';

@Component({
  selector: 'majk-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  providers: [FormService]
})
export class ConfirmComponent {
  constructor(
    protected formService: FormService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private store$: Store<RootState>
  ) {}

  confirmId = this.route.snapshot.params['confirmId'];

  confirmForm = this.builder.group({
    confirmId: ['', Validators.required],
    activationCode: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
  });

  ngOnInit(): void {
    this.confirmForm.patchValue({
      confirmId: this.confirmId
    });
  }

  confirm() {
    const payload = this.confirmForm.value;
    console.log(payload);
    this.store$.dispatch(AuthActions.confirm({ payload: payload }));
  }

  isFieldValid(fieldName: string) {
    return this.formService.isFieldValid(fieldName, this.confirmForm);
  }

  isErrorEnabled(fieldName: string) {
    return this.formService.errorEnabled(fieldName, this.confirmForm);
  }

  getError(fieldName: string): string[] {
    return this.formService.getErrorKey(fieldName, this.confirmForm);
  }
}
