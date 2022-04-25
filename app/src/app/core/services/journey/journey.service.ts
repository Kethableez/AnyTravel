import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModuleName } from '@models/module-name.model';
import { BaseRequestService } from '@services/base-request.service';
import { ParametersInjectorService } from '@services/parameters-injector.service';
import { Observable } from 'rxjs';

enum JourneyActions {
  CREATE = 'create',
  BY_GROUP = 'by-group/:groupId',
  BY_GROUPS = 'by-groups'
}

@Injectable({
  providedIn: 'root'
})
export class JourneyService extends BaseRequestService {
  constructor(protected override http: HttpClient, protected override injector: ParametersInjectorService) {
    super(http, injector);
  }

  protected get moduleName(): ModuleName {
    return ModuleName.JOURNEY;
  }

  doCreate(body: any): Observable<any> {
    const url = this.getUrl(JourneyActions.CREATE);

    return this.post<any>(url, body);
  }

  doGetByGroup(groupId: string): Observable<any> {
    const url = this.getUrl(JourneyActions.CREATE, { groupId: groupId });

    return this.get<any>(url);
  }

  // doGetByGroup(groupId: string): Observable<any> {
  //   const url = this.getUrl(JourneyActions.CREATE, { groupId: groupId });

  //   return this.get<any>(url);
  // }
}
