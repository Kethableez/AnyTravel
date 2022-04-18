import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.local-dev';
import { metaReducers } from '@store/app.states';
import { HydrationEffects } from '@store/hydration/hydration.effects';
import { AuthInterceptor } from '@helpers/auth.interceptor';
import { AppComponent } from './main/app.component';
import { AuthStateModule } from '@store/auth';
import { UserStateModule } from '@store/user';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AttractionStateModule } from '@store/attraction';
import { RefreshTokenInterceptor } from '@elpers/refresh-token.interceptor';
import { AuthInitService } from '@helpers/auth-init.service';
import { authInit } from '@helpers/functions/auth-init';
import { NotificationStateModule } from '@store/notification';
import { SharedModule } from './shared/shared.module';
import { NotificationComponent } from './main/notification/notification.component';

@NgModule({
  declarations: [AppComponent, NotificationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    AuthStateModule,
    UserStateModule,
    AttractionStateModule,
    NotificationStateModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([HydrationEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [
    AuthInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: authInit,
      deps: [AuthInitService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
