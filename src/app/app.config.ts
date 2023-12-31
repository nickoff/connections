import { DatePipe } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { effects } from './store/root-effect';
import { metaReducers, reducers } from './store/root-reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([apiInterceptor, headerInterceptor])),
    provideRouter(routes),
    provideAnimations(),
    provideStore(reducers, { metaReducers }),
    provideEffects(effects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    DatePipe
  ]
};
