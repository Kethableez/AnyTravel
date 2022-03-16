import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModuleName } from '../../models/module-name.model';
import { BaseRequestService } from '../base-request.service';
import { ParametersInjectorService } from '../parameters-injector.service';

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
export class GroupServic extends BaseRequestService {
  constructor(protected override http: HttpClient, protected override injector: ParametersInjectorService) {
    super(http, injector);
  }

  protected get moduleName(): ModuleName {
    return ModuleName.GROUP;
  }
}
