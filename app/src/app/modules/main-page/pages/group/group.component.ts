import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Group } from 'src/app/core/models/group/group.model';
import { RootState } from 'src/app/core/store/app.states';
import { GroupActions, selectGroupData, selectNewGroupData } from 'src/app/core/store/group';
import { GroupService } from 'src/app/core/services/group/group.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateGroupPayload } from 'src/app/core/models/group/crate-group-payload';

@Component({
  selector: 'majk-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {

  newGroupForm = this.formBuilder.group({
    name: '',
    cover: ''
  });

  constructor(private store$: Store<RootState>, private service: GroupService, private formBuilder: FormBuilder) { }

  userGroups$ = this.store$.select(selectGroupData);
  newUserGroups$ = this.store$.select(selectNewGroupData);

  ngOnInit(): void { }

  createNewGroup() {
    const payload: CreateGroupPayload = {
      ... this.newGroupForm.value,
    };

    this.store$.dispatch(GroupActions.createGroup({ payload: payload }));
  }
}
