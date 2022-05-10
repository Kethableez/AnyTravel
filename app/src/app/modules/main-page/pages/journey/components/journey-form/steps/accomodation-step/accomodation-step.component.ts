import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormService } from '@services/form.service';
import { RootState } from '@store/app.states';
import { selectWizardAccomodation, WizardActions } from '@store/journey';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';

@Component({
  selector: 'majk-accomodation-step',
  templateUrl: './accomodation-step.component.html',
  styleUrls: ['./accomodation-step.component.scss'],
  providers: [FormService]
})
export class AccomodationStepComponent extends CleanableDirective implements OnInit {
  constructor(protected formService: FormService, private builder: FormBuilder, private store$: Store<RootState>) {
    super();
    this.addSubscription(
      this.store$.select(selectWizardAccomodation).subscribe((accomodation) => {
        if (accomodation) {
          this.isAccomodationFormEnabled = true;
          this.accomodationForm.patchValue(accomodation);
          this.addressForm.patchValue(accomodation.address);
        } else this.isAccomodationFormEnabled = false;
      })
    );
  }

  @Output()
  submitStep = new EventEmitter<any>();

  isAccomodationFormEnabled = false;

  accomodationForm = this.builder.group({
    placeName: ['', Validators.required],
    checkIn: ['', Validators.required],
    checkOut: ['', Validators.required],
    additionalInfo: ['', Validators.required],
    link: ['']
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

  ngOnInit(): void {}

  toggleAccomodationForm(value: boolean) {
    this.isAccomodationFormEnabled = value;
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

  nextStep() {
    const formData = this.isAccomodationFormEnabled
      ? {
          ...this.accomodationForm.value,
          address: this.addressForm.value
        }
      : null;
    this.store$.dispatch(WizardActions.updateWizard({ key: 'accomodation', object: formData }));
    this.submitStep.emit(formData);
  }
}
