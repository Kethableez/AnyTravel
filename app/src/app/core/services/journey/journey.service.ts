import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModuleName } from '@models/module-name.model';
import { Store } from '@ngrx/store';
import { BaseRequestService } from '@services/base-request.service';
import { ParametersInjectorService } from '@services/parameters-injector.service';
import { RootState } from '@store/app.states';
import { getUserJourneys } from '@store/journey/actions/journeys.actions';
import { first, Observable, tap } from 'rxjs';

enum JourneyActions {
  CREATE = 'create',
  BY_GROUP = 'by-group/:groupId',
  BY_USER = 'by-user'
}

@Injectable({
  providedIn: 'root'
})
export class JourneyService extends BaseRequestService {
  constructor(
    protected override http: HttpClient,
    protected override injector: ParametersInjectorService,
    private store$: Store<RootState>
  ) {
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
    const url = this.getUrl(JourneyActions.BY_GROUP, { groupId: groupId });

    return this.get<any>(url);
  }

  doGetByUser(): Observable<any> {
    const url = this.getUrl(JourneyActions.BY_USER);

    return this.get<any>(url);
  }

  initData() {
    return this.store$.pipe(
      first(),
      tap(() => {
        this.store$.dispatch(getUserJourneys());
      })
    );
  }
}
