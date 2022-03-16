import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { ModuleName } from 'src/app/core/models/module-name.model';
import { BaseRequestService } from 'src/app/core/services/base-request.service';
import { ParametersInjectorService } from 'src/app/core/services/parameters-injector.service';
import { AvailabilityPayload } from '../../models/user/availability-payload';
import { LoginPayload } from '../../models/user/login-payload';
import { LoginResponse } from '../../models/user/login-response';
import { RegisterPayload } from '../../models/user/register-payload';
import { User } from '../../models/user/user.model';

enum UserActions {
  REGISTER = 'register',
  LOGIN = 'login',
  GET_DATA = 'data',
  ALL = 'all',
  AVAILABILITY = 'availability',
  EDIT = 'edit',
  DELETE = 'delete'
}

interface CheckResponse {
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseRequestService {
  constructor(protected override http: HttpClient, protected override injector: ParametersInjectorService) {
    super(http, injector);
  }

  protected get moduleName(): ModuleName {
    return ModuleName.USER;
  }

  doRegister(body: RegisterPayload): Observable<Response> {
    const url = this.getUrl(UserActions.REGISTER);

    return this.post<Response>(url, body);
  }

  doLogin(body: LoginPayload): Observable<LoginResponse> {
    const url = this.getUrl(UserActions.LOGIN);

    return this.post<LoginResponse>(url, body);
  }

  doGetLoggedUserData(): Observable<User> {
    const url = this.getUrl(UserActions.GET_DATA);

    return this.get<User>(url);
  }

  doCheckAvailability(body: AvailabilityPayload): Observable<boolean> {
    const url = this.getUrl(UserActions.AVAILABILITY);
    return this.post<CheckResponse>(url, body).pipe(
      delay(2000),
      map((res) => res.available)
    );
  }
}
