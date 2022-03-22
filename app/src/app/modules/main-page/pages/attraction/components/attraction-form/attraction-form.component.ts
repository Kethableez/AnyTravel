import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AttractionPayload } from 'src/app/core/models/attraction/attraction-payload.model';
import { FileService } from 'src/app/core/services/file/file.service';
import { FormService } from 'src/app/core/services/form.service';
import { RootState } from 'src/app/core/store/app.states';
import { AttractionActions } from 'src/app/core/store/attraction';

@Component({
  selector: 'majk-attraction-form',
  templateUrl: './attraction-form.component.html',
  styleUrls: ['./attraction-form.component.scss'],
  providers: [FormService]
})
export class AttractionFormComponent implements OnInit {
  constructor(
    protected formService: FormService,
    private builder: FormBuilder,
    private fileService: FileService,
    private store$: Store<RootState>
  ) {}

  file = new FormData();

  attractionForm = this.builder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    cover: ['', Validators.required],
    additionalInfo: ['']
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

  additionalInfo = this.builder.group({
    link: [''],
    hours: ['']
  });

  ngOnInit(): void {}

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
      case 'info':
        return this.additionalInfo;
      default:
        return this.attractionForm;
    }
  }

  uploadFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.attractionForm.controls['cover'].markAsTouched();
      this.attractionForm.patchValue({
        cover: file.name
      });

      this.file.append('file', file);
    }
  }

  createAttraction(): void {
    const payload: AttractionPayload = {
      ...this.attractionForm.value,
      address: { ...this.addressForm.value },
      additionalInfo: { ...this.additionalInfo.value }
    };

    this.store$.dispatch(AttractionActions.createAttraction({ file: this.file, payload: payload }));
  }
}
