import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormService } from '@services/form.service';
import { RootState } from '@store/app.states';
import { selectWizardMeeting, WizardActions } from '@store/journey';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';

@Component({
  selector: 'majk-meeting-step',
  templateUrl: './meeting-step.component.html',
  styleUrls: ['./meeting-step.component.scss'],
  providers: [FormService]
})
export class MeetingStepComponent extends CleanableDirective implements OnInit {
  constructor(private formService: FormService, private builder: FormBuilder, private store$: Store<RootState>) {
    super();
    this.addSubscription(
      this.store$.select(selectWizardMeeting).subscribe((meeting) => {
        if (meeting) {
          this.meetingForm.patchValue(meeting);
          this.addressForm.patchValue(meeting.address);
        }
      })
    );
  }

  @Output()
  submitStep = new EventEmitter<any>();

  meetingForm = this.builder.group({
    placeName: ['', Validators.required],
    meetingDate: ['', Validators.required]
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
    const formData = {
      ...this.meetingForm.value,
      address: this.addressForm.value
    };
    this.store$.dispatch(WizardActions.updateWizard({ key: 'meetingPlace', object: formData }));
    this.submitStep.emit(formData);
  }
}
