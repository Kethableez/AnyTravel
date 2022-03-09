import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

enum StyleSelector {
  DEFAULT = '',
  PRIMARY = 'is-primary',
  DANGER = 'is-danger',
  LOADING = 'is-loading'
}

@Injectable()
export class FormService {
  isFieldValid(fieldName: string, form: FormGroup) {
    const field = form.get(fieldName);

    if (field?.touched) {
      return field.valid ? StyleSelector.PRIMARY : StyleSelector.DANGER;
    }
    return StyleSelector.DEFAULT;
  }

  get styleSelector() {
    return StyleSelector;
  }
}
