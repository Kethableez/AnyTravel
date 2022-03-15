import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.local-dev';
import { metaReducers } from './core/store/app.states';
import { HydrationEffects } from './core/store/hydration/hydration.effects';
import { AuthInterceptor } from './core/helpers/auth.interceptor';
import { AppComponent } from './main/app.component';
import { AuthStateModule } from './core/store/auth';
import { UserStateModule } from './core/store/user';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthStateModule,
    UserStateModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([HydrationEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
