import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Group } from 'src/app/core/models/group/group.model';
import { RootState } from 'src/app/core/store/app.states';
import { GroupActions, selectGroupData, selectNewGroupData } from 'src/app/core/store/group';
import { GroupService } from 'src/app/core/services/group/group.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateGroupPayload } from 'src/app/core/models/group/crate-group-payload';
import { CleanableDirective } from 'src/app/shared/directives/cleanable.directive';


enum ViewSelector {
  ALL = 'ALL',
  CREATOR = 'CREATOR',
  PENDING = 'PENDING'
}

@Component({
  selector: 'majk-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent extends CleanableDirective implements OnInit {

  currentView = ViewSelector.ALL;


  constructor(private store$: Store<RootState>, private service: GroupService, private formBuilder: FormBuilder) { super(); }

  userGroups$ = this.store$.select(selectGroupData);
  newUserGroups$ = this.store$.select(selectNewGroupData);

  ngOnInit(): void {
    this.addSubscription(this.service.initData().subscribe());
  }

  changeView(selector: ViewSelector) {
    this.currentView = selector;
  }

  isViewActive(selector: ViewSelector) {
    return this.currentView === selector ? 'is-active' : '';
  }

  get ViewSelector() {
    return ViewSelector;
  }

}
