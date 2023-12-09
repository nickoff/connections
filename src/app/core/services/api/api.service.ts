import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { API_ENDPOINT } from '../../../shared/constants/api-endpoint';
import { LoginException } from '../../../shared/constants/login-exceptions';
import { LoginRequestModel, LoginResponseModel } from '../../../shared/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
  fetchAuthData(credentails: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(API_ENDPOINT.LOGIN, credentails).pipe(
      catchError((error: HttpErrorResponse) => {
        const loginException: LoginException = error.error;
        return throwError(() => loginException);
      })
    );
  }
}
