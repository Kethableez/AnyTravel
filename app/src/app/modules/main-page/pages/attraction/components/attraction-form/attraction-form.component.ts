import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AttractionPayload } from 'src/app/core/models/attraction/attraction-payload.model';
import { FormName } from 'src/app/core/models/form-name.model';
import { AttractionService } from 'src/app/core/services/attraction/attraction.service';
import { FormService } from 'src/app/core/services/form.service';
import { RootState } from 'src/app/core/store/app.states';
import { AttractionActions } from 'src/app/core/store/attraction';

@Component({
  selector: 'majk-attraction-form',
  templateUrl: './attraction-form.component.html',
  styleUrls: ['./attraction-form.component.scss'],
  providers: [FormService]
})
export class AttractionFormComponent {
  constructor(
    protected formService: FormService,
    private builder: FormBuilder,
    private store$: Store<RootState>,
    private attractionService: AttractionService
  ) {}

  file = new FormData();

  attractionForm = this.builder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    cover: ['', Validators.required],
    category: ['', Validators.required],
    attractionType: ['', Validators.required],
    isPaid: [false, Validators.required],
    ticketPrice: [{ value: '', disabled: true }],
    link: [{ value: '', disabled: true }],
    hoursFrom: [{ value: '', disabled: true }],
    hoursTo: [{ value: '', disabled: true }]
  });

  addressForm = this.builder.group({
    country: ['', Validators.required],
    zipCode: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    apartment: [''],
    lat: [0, Validators.required],
    lng: [0, Validators.required]
  });

  get categories() {
    return this.attractionService.attractionCategory;
  }

  get types() {
    return this.attractionService.attractionType;
  }

  toggleField(fieldName: string, enabled: boolean) {
    if (enabled) {
      this.getControl(this.attractionForm, fieldName).enable();
      this.getControl(this.attractionForm, fieldName).addValidators(Validators.required);
      if (this.getControl(this.attractionForm, fieldName).value === '') {
        this.getControl(this.attractionForm, fieldName).setErrors({ required: true });
      }
    } else {
      this.getControl(this.attractionForm, fieldName).disable();
      this.getControl(this.attractionForm, fieldName).removeValidators(Validators.required);
    }
  }

  isFieldValid(fieldName: string, form: FormGroup) {
    return this.formService.isFieldValid(fieldName, form);
  }

  isErrorEnabled(fieldName: string, form: FormGroup) {
    return this.formService.errorEnabled(fieldName, form);
  }

  getError(fieldName: string, form: FormGroup): string[] {
    return this.formService.getErrorKey(fieldName, form);
  }

  getFormName(form: string): FormGroup {
    switch (form) {
      case 'address':
        return this.addressForm;
      default:
        return this.attractionForm;
    }
  }

  uploadFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.getControl(this.attractionForm, 'cover').markAsTouched();
      this.attractionForm.patchValue({
        cover: file.name
      });

      this.file.append('file', file);
    }
  }

  createAttraction(): void {
    const payload: AttractionPayload = {
      ...this.attractionForm.value,
      hours: `${this.getControl(this.attractionForm, 'hoursFrom').value} - ${
        this.getControl(this.attractionForm, 'hoursTo').value
      }`,
      address: { ...this.addressForm.value }
    };

    this.store$.dispatch(AttractionActions.createAttraction({ file: this.file, payload: payload }));
    this.attractionForm.reset(this.formService.getInitialForm(FormName.ATTRACTION));
    this.addressForm.reset(this.formService.getInitialForm(FormName.ADDRESS));
    this.file.delete('file');
  }

  getControl(form: FormGroup, controlName: string) {
    return form.controls[controlName];
  }
}
