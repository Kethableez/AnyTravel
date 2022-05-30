import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';
import { ModuleName } from '../../models/module-name.model';
import { BaseRequestService } from '../base-request.service';
import { ParametersInjectorService } from '../parameters-injector.service';
import { Group } from '../../models/group/group.model';
import { CreateGroupPayload } from '../../models/group/crate-group-payload';
import { RootState } from '../../store/app.states';
import { Store } from '@ngrx/store';
import { getUserGroups } from '../../store/group/group.actions';
import { EditGroupPayload } from '../../models/group/edit-group-payload';

enum GroupActions {
  ALL = 'all',
  GET_BY_ID = 'get/:groupId',
  GET_USER_GROUPS = 'user-groups',
  CREATE_GROUP = 'create',
  EDIT_GROUP = 'edit/:groupId',
  DELETE_GROUP = 'delete/:groupId',
  ADD_USER = 'add/:groupId',
  REMOVE_USER = 'remove/:groupId',
  JOIN = 'join/:groupId',
  LEAVE = 'leave/:groupId'
}

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseRequestService {
  constructor(
    protected override http: HttpClient,
    protected override injector: ParametersInjectorService,
    private store$: Store<RootState>
  ) {
    super(http, injector);
  }

  protected get moduleName(): ModuleName {
    return ModuleName.GROUP;
  }

  doGetAllUserGroups(): Observable<Group[]> {
    const url = this.getUrl(GroupActions.GET_USER_GROUPS);

    return this.get<Group[]>(url);
  }

  doCreateGroup(body: CreateGroupPayload) {
    const url = this.getUrl(GroupActions.CREATE_GROUP);

    return this.post<CreateGroupPayload>(url, body);
  }

  doGetAll(): Observable<Group[]> {
    const url = this.getUrl(GroupActions.ALL);

    return this.get<Group[]>(url);
  }

  doDeleteGroup(groupID: string): Observable<Response> {
    const url = this.getUrl(GroupActions.DELETE_GROUP, { groupId: groupID });

    return this.post<Response>(url);
  }

  doJoin(invitationCode: string): Observable<Response> {
    const url = this.getUrl(GroupActions.JOIN, { groupId: invitationCode });


    return this.post<Response>(url);
  }

  doEdit(groupId: string, payload: EditGroupPayload) {
    const url = this.getUrl(GroupActions.EDIT_GROUP, { groupId: groupId });

    return this.post<EditGroupPayload>(url, payload);
  }

  doAdd(groupId: string, payload: string) {
    const url = this.getUrl(GroupActions.ADD_USER, { groupId: groupId });

    return this.post<string>(url, payload);
  }

  doRemove(memberId: string): Observable<Response> {
    const url = this.getUrl(GroupActions.REMOVE_USER, { groupId: memberId });

    return this.post<Response>(url);
  }

  doLeave(groupId: string): Observable<Response> {
    const url = this.getUrl(GroupActions.LEAVE, { groupId: groupId });

    return this.post<Response>(url);
  }

  initData() {
    return this.store$.pipe(
      first(),
      tap(() => {
        this.store$.dispatch(getUserGroups());
      })
    );
  }
}
