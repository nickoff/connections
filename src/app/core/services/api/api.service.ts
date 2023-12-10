import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { SignupException } from 'src/app/shared/constants/signup-exceptions';
import { SignupRequestModel } from 'src/app/shared/models/signup.model';

import { API_ENDPOINT } from '../../../shared/constants/api-endpoint';
import { SigninException } from '../../../shared/constants/signin-exceptions';
import { SigninRequestModel, SigninResponseModel } from '../../../shared/models/signin.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
  fetchAuthData(credentails: SigninRequestModel): Observable<SigninResponseModel> {
    return this.http.post<SigninResponseModel>(API_ENDPOINT.LOGIN, credentails).pipe(
      catchError((error: HttpErrorResponse) => {
        const loginException: SigninException = error.error;
        return throwError(() => loginException);
      })
    );
  }

  fetchRegistration(registrationCredentails: SignupRequestModel): Observable<null> {
    return this.http.post(API_ENDPOINT.REGISTRATION, registrationCredentails).pipe(
      map(() => null),
      catchError((error: HttpErrorResponse) => {
        const signupException: SignupException = error.error;
        return throwError(() => signupException);
      })
    );
  }
}
