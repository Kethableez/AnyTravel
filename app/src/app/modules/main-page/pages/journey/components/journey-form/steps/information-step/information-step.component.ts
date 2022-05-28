import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormService } from '@services/form.service';
import { RootState } from '@store/app.states';
import { selectWizardInformation, WizardActions } from '@store/journey';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';

@Component({
  selector: 'majk-information-step',
  templateUrl: './information-step.component.html',
  styleUrls: ['./information-step.component.scss'],
  providers: [FormService]
})
export class InformationStepComponent extends CleanableDirective implements OnInit {
  constructor(private formService: FormService, private builder: FormBuilder, private store$: Store<RootState>) {
    super();
    this.addSubscription(
      this.store$.select(selectWizardInformation).subscribe((information) => {
        if (information) this.informationForm.patchValue(information);
      })
    );
  }

  @Output()
  submitStep = new EventEmitter<any>();

  informationForm = this.builder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  });

  file = new FormData();

  ngOnInit(): void {}

  isFieldValid(fieldName: string) {
    return this.formService.isFieldValid(fieldName, this.informationForm);
  }

  isErrorEnabled(fieldName: string) {
    return this.formService.errorEnabled(fieldName, this.informationForm);
  }

  getError(fieldName: string) {
    return this.formService.getErrorKey(fieldName, this.informationForm);
  }

  nextStep() {
    const formData = this.informationForm.value;
    this.store$.dispatch(WizardActions.updateWizard({ key: 'information', object: formData }));
    this.submitStep.emit(formData);
  }

  uploadFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.getControl(this.informationForm, 'cover').markAsTouched();
      this.informationForm.patchValue({
        cover: file.name
      });
      this.file.append('file', file);
    }
  }

  getControl(form: FormGroup, controlName: string) {
    return form.controls[controlName];
  }
}
