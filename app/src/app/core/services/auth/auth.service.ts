import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleName } from '@models/module-name.model';
import { LoginPayload } from '@models/user/login-payload';
import { BaseRequestService } from '../base-request.service';
import { ParametersInjectorService } from '../parameters-injector.service';

enum AuthActions {
  LOGIN = 'login',
  REFRESH = 'refresh',
  LOGOUT = 'logout',
  CONFIRM = 'confirm',
  RESEND = 'resend'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseRequestService {
  constructor(protected override http: HttpClient, protected override injector: ParametersInjectorService) {
    super(http, injector);
  }

  protected get moduleName(): ModuleName {
    return ModuleName.AUTH;
  }

  doLogin(body: LoginPayload): Observable<any> {
    const url = this.getUrl(AuthActions.LOGIN);

    return this.postWithCredentials(url, body);
  }

  doRefresh(): Observable<any> {
    const url = this.getUrl(AuthActions.REFRESH);

    return this.postWithCredentials(url);
  }

  doLogout(): Observable<any> {
    const url = this.getUrl(AuthActions.LOGOUT);

    return this.postWithCredentials(url);
  }

  doConfirm() {
    const url = this.getUrl(AuthActions.CONFIRM);
  }

  doResend() {
    const url = this.getUrl(AuthActions.RESEND);
  }
}
