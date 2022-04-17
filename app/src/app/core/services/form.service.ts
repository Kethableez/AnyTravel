import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { initialFroms } from '@helpers/form.init';
import { FormName } from '@models/form-name.model';

export enum StyleSelector {
  DEFAULT = '',
  PRIMARY = 'is-primary',
  DANGER = 'is-danger',
  LOADING = 'is-loading'
}

@Injectable()
export class FormService {
  private readonly initialForms = initialFroms;

  isFieldValid(fieldName: string, form: FormGroup) {
    const field = form.get(fieldName);
    if (field?.touched) {
      const status = field.status;
      if (status === 'VALID') return StyleSelector.PRIMARY;
      else if (status === 'INVALID') return StyleSelector.DANGER;
      else return StyleSelector.DEFAULT;
    }
    return StyleSelector.DEFAULT;
  }

  get styleSelector() {
    return StyleSelector;
  }

  toggleLoading(controlName: string) {
    const loading = 'is-loading';
    const control = document.getElementById(controlName);
    if (control) {
      if (control.classList.contains(loading)) {
        control.classList.remove(loading);
      } else control.classList.add(loading);
    }
  }

  errorEnabled(fieldName: string, form: FormGroup): boolean {
    const field = form.controls[fieldName];

    return field.touched && !field.valid;
  }
  getErrorKey(fieldName: string, form: FormGroup): string[] {
    const errors = form.controls[fieldName].errors as ValidationErrors;
    if (errors) {
      return Object.keys(errors);
    }
    return [];
  }

  getInitialForm(form: FormName) {
    return this.initialForms[form];
  }
}
