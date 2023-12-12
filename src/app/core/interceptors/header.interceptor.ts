import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ServerException } from 'src/app/shared/constants/server-exceptions';

import { ErrorSnackbarService } from '../services/snackbar/error-snackbar.service';

export const headerInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (!localStorage.getItem('token')) return next(request);

  const newHeader = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'rs-email': `${localStorage.getItem('email')}`,
    'rs-uid': `${localStorage.getItem('uid')}`
  });

  const snackBar = inject(ErrorSnackbarService);
  return next(
    request.clone({
      headers: newHeader
    })
  ).pipe(
    catchError((error: HttpErrorResponse) => {
      const serverException: ServerException = error.error;
      snackBar.openSnackbar(serverException.message);
      return throwError(() => serverException);
    })
  );
};
