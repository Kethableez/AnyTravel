import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttractionPayload } from '../../models/attraction/attraction-payload.model';
import { Attraction } from '../../models/attraction/attration.model';
import { ModuleName } from '../../models/module-name.model';
import { Response } from '../../models/response.model';
import { BaseRequestService } from '../base-request.service';
import { ParametersInjectorService } from '../parameters-injector.service';

enum AttractionActions {
  CREATE_ATTRACTION = 'create',
  ALL_ATTRACTIONS = 'all',
  ATTRACTION_BY_ID = 'get/:attractionId'
}

@Injectable({
  providedIn: 'root'
})
export class AttractionService extends BaseRequestService {
  constructor(protected override http: HttpClient, protected override injector: ParametersInjectorService) {
    super(http, injector);
  }

  protected get moduleName(): ModuleName {
    return ModuleName.ATTRACTION;
  }

  doCreateAttraction(body: AttractionPayload): Observable<Response> {
    const url = this.getUrl(AttractionActions.CREATE_ATTRACTION);

    return this.post<Response>(url, body);
  }

  doGetAll(): Observable<Attraction[]> {
    const url = this.getUrl(AttractionActions.ALL_ATTRACTIONS);

    return this.get<Attraction[]>(url);
  }

  doGetById(attractionId: string): Observable<Attraction> {
    const url = this.getUrl(AttractionActions.ATTRACTION_BY_ID, { attractionId: attractionId });

    return this.get<Attraction>(url);
  }
}
