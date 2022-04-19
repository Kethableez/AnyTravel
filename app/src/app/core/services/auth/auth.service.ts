import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAuthResponse } from '@models/auth/base-auth-response.model';
import { ConfirmPayload } from '@models/auth/confirm-payload.model';
import { BaseResponse } from '@models/base-response.model';
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

  doLogin(body: LoginPayload): Observable<BaseAuthResponse> {
    const url = this.getUrl(AuthActions.LOGIN);

    return this.postWithCredentials<BaseAuthResponse>(url, body);
  }

  doRefresh(): Observable<BaseAuthResponse> {
    const url = this.getUrl(AuthActions.REFRESH);

    return this.postWithCredentials<BaseAuthResponse>(url);
  }

  doLogout(): Observable<BaseResponse> {
    const url = this.getUrl(AuthActions.LOGOUT);

    return this.postWithCredentials<BaseResponse>(url);
  }

  doConfirm(body: ConfirmPayload) {
    const url = this.getUrl(AuthActions.CONFIRM);
    console.log(body);
    return this.post<BaseResponse>(url, body);
  }

  // doResend() {
  //   const url = this.getUrl(AuthActions.RESEND);
  // }
}
