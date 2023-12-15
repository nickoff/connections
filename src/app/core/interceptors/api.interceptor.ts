import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';
import { ServerException } from 'src/app/shared/constants/server-exceptions';
import { environment } from 'src/environments/environment';

import { LoadingService } from '../services/loading/loading.services';
import { ErrorSnackbarService } from '../services/snackbar/error-snackbar.service';

export const apiInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const loadingService = inject(LoadingService);
  const snackBar = inject(ErrorSnackbarService);
  const userService = inject(UserService);

  loadingService.setLoading(true);
  return next(
    request.clone({
      url: `${environment.API_URL}/${request.url}`
    })
  ).pipe(
    catchError((error: HttpErrorResponse) => {
      const serverException: ServerException = error.error;
      snackBar.openSnackbar(serverException.message);
      if (serverException.type === 'InvalidTokenException' || serverException.type === 'InvalidIDException') {
        userService.logout();
      }
      return throwError(() => serverException);
    }),
    finalize(() => loadingService.setLoading(false))
  );
};
