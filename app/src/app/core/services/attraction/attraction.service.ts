import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, Observable, tap } from 'rxjs';
import { AttractionCategory } from '../../models/attraction/attraction-category.model';
import { AttractionPayload } from '../../models/attraction/attraction-payload.model';
import { AttractionType } from '../../models/attraction/attraction-type.model';
import { Attraction } from '../../models/attraction/attration.model';
import { ModuleName } from '../../models/module-name.model';
import { Response } from '../../models/response.model';
import { RootState } from '../../store/app.states';
import { getAttractions, getNewAttractions } from '../../store/attraction/attraction.actions';
import { BaseRequestService } from '../base-request.service';
import { ParametersInjectorService } from '../parameters-injector.service';

enum AttractionActions {
  CREATE_ATTRACTION = 'create',
  ALL_ATTRACTIONS = 'all',
  TO_APPROVE = 'to-approve',
  ATTRACTION_BY_ID = 'get/:attractionId',
  APPROVE = 'approve/:attractionId',
  DELETE = 'delete/:attractionId',
  ADD_REVIEW = 'review/:attractionId'
}

export interface AttractionResponse {
  message: string;
  attraction: Attraction;
}

@Injectable({
  providedIn: 'root'
})
export class AttractionService extends BaseRequestService {
  constructor(
    protected override http: HttpClient,
    protected override injector: ParametersInjectorService,
    private store$: Store<RootState>
  ) {
    super(http, injector);
  }

  protected get moduleName(): ModuleName {
    return ModuleName.ATTRACTION;
  }

  doCreateAttraction(body: AttractionPayload): Observable<AttractionResponse> {
    const url = this.getUrl(AttractionActions.CREATE_ATTRACTION);

    return this.post<AttractionResponse>(url, body);
  }

  doGetAll(): Observable<Attraction[]> {
    const url = this.getUrl(AttractionActions.ALL_ATTRACTIONS);

    return this.get<Attraction[]>(url);
  }

  doGetToApprove(): Observable<Attraction[]> {
    const url = this.getUrl(AttractionActions.TO_APPROVE);

    return this.get<Attraction[]>(url);
  }

  doGetById(attractionId: string): Observable<Attraction> {
    const url = this.getUrl(AttractionActions.ATTRACTION_BY_ID, { attractionId: attractionId });

    return this.get<Attraction>(url);
  }

  doApprove(attractionId: string): Observable<AttractionResponse> {
    const url = this.getUrl(AttractionActions.APPROVE, { attractionId: attractionId });

    return this.post<AttractionResponse>(url);
  }

  doDelete(attractionId: string): Observable<Response> {
    const url = this.getUrl(AttractionActions.DELETE, { attractionId: attractionId });

    return this.post<Response>(url);
  }

  doAddReview(attractionId: string, payload: { review: number }): Observable<Response> {
    const url = this.getUrl(AttractionActions.ADD_REVIEW, { attractionId: attractionId });

    return this.post<Response>(url, payload);
  }

  initData() {
    return this.store$.pipe(
      first(),
      tap(() => {
        this.store$.dispatch(getAttractions());
        this.store$.dispatch(getNewAttractions());
      })
    );
  }

  get attractionCategory() {
    return [
      {
        value: AttractionCategory.RESTAURANT,
        displayValue: 'Restauracja',
        label: '#ffff00'
      },
      {
        value: AttractionCategory.BAR,
        displayValue: 'Bar',
        label: '#ffff00'
      },
      {
        value: AttractionCategory.COFFEE,
        displayValue: 'Kawiarnia',
        label: '#0000ff'
      },
      {
        value: AttractionCategory.PARK,
        displayValue: 'Park',
        label: '#0000ff'
      },
      {
        value: AttractionCategory.GYM,
        displayValue: 'Siłownia',
        label: '#ff00ff'
      },
      {
        value: AttractionCategory.ART,
        displayValue: 'Sztuka',
        label: '#ff00ff'
      },
      {
        value: AttractionCategory.MUSEUM,
        displayValue: 'Muzeum',
        label: '#e5f4ee'
      },
      {
        value: AttractionCategory.LIBRARY,
        displayValue: 'Biblioteka',
        label: '#00ff00'
      },
      {
        value: AttractionCategory.LAKE,
        displayValue: 'Jezioro',
        label: '#00ff00'
      },
      {
        value: AttractionCategory.FOREST,
        displayValue: 'Las',
        label: '#00ff00'
      },
      {
        value: AttractionCategory.BEACH,
        displayValue: 'Plaża',
        label: '#00ff00'
      }
    ];
  }

  get attractionType() {
    return [
      {
        value: AttractionType.INDOOR,
        displayValue: 'Wewnętrzna',
        label: '#e6e6e6'
      },
      {
        value: AttractionType.OUTDOOR,
        displayValue: 'Zewnętrzna',
        label: '#e6e6ff'
      }
    ];
  }

  get initialAttraction() {
    return {
      name: '',
      description: '',
      cover: '',
      category: '',
      attractionType: '',
      isPaid: false
    };
  }

  get initialAddress() {
    return {
      country: '',
      zipCode: '',
      city: '',
      street: '',
      apartment: '',
      lat: 0,
      lng: 0
    };
  }
}
