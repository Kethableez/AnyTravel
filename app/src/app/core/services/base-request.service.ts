/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modules } from 'src/app/models/modules.model';
import { environment } from 'src/environments/environment';
import { ParametersInjectorService } from './parameters-injector.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseRequestService {
  constructor(protected http: HttpClient, protected injector: ParametersInjectorService) {}

  readonly baseUrl = environment.baseUrl;

  protected abstract get moduleName(): Modules;

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post<T>(url: string, body?: any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  getUrl(action: any, params?: any) {
    const url = [this.baseUrl, this.moduleName, params ? this.injector.injectParameters(action, params) : action].join(
      '/'
    );
    return url;
  }
}
