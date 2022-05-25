import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormService } from '@services/form.service';
import { RootState } from '@store/app.states';
import { selectGroupData } from '@store/group';
import { selectUserJourneys } from '@store/journey';
import { UserActions } from '@store/user';
import { selectUserData } from '@store/user/user.selectors';
import { combineLatest, concatMap, map } from 'rxjs';

enum FormSelector {
  DATA = 'data',
  PASSWORD = 'password',
  AVATAR = 'avatar',
  DELETE = 'delete'
}

@Component({
  selector: 'majk-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [FormService]
})
export class ProfileComponent implements OnInit {
  constructor(private store$: Store<RootState>, private formService: FormService, private builder: FormBuilder) {}

  formEnabled = false;

  file = new FormData();

  selectedForm = FormSelector.DATA;

  currentUser$ = this.store$.select(selectUserData);

  stats$ = combineLatest(
    [this.store$.select(selectGroupData), this.store$.select(selectUserJourneys)],
    (groups, journeys) => {
      return {
        group: groups.length,
        journeys: journeys.length,
        countries: [...new Set(journeys.map((j) => j.destination.country.toLowerCase()))].length
      };
    }
  );

  dataForm = this.builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthdate: ['', Validators.required]
  });

  passwordForm = this.builder.group({
    oldPassword: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  deleteForm = this.builder.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  getAvatar(avatarRef: string) {
    return avatarRef.startsWith('avatar/') ? `http://localhost:9000/api/file/download/${avatarRef}` : avatarRef;
  }

  toggleForm() {
    this.formEnabled = !this.formEnabled;
  }

  isFormActive(selector: FormSelector) {
    return this.selectedForm === selector ? 'is-active' : '';
  }

  get FormSelector() {
    return FormSelector;
  }

  selectForm(selector: FormSelector) {
    this.selectedForm = selector;
  }

  isFieldValid(fieldName: string, form: FormGroup) {
    return this.formService.isFieldValid(fieldName, form);
  }

  isErrorEnabled(fieldName: string, form: FormGroup) {
    return this.formService.errorEnabled(fieldName, form);
  }

  getError(fieldName: string, form: FormGroup) {
    return this.formService.getErrorKey(fieldName, form);
  }

  getControl(form: FormGroup, controlName: string) {
    return form.controls[controlName];
  }

  uploadFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.file.delete('file');
      this.file.append('file', file);
    }
  }

  get filename() {
    const file = this.file.get('file');
    return file ? (file as any).name : '...';
  }

  ngOnInit(): void {}

  changeAvatar() {
    this.store$.dispatch(UserActions.changeAvatar({ file: this.file }));
  }

  deleteAccount() {
    const payload = this.deleteForm.value;

    this.store$.dispatch(UserActions.deleteAccount({ payload: payload }));
  }

  changeData(form: FormGroup) {
    const payload = form.value;

    this.store$.dispatch(UserActions.changeData({ changePayload: payload }));
  }
}
