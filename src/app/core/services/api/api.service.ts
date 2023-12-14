import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GroupListModel } from 'src/app/shared/models';
import { SignupRequestModel } from 'src/app/shared/models/signup.model';
import { NewNameModel, UserModel } from 'src/app/shared/models/user.model';

import { API_ENDPOINT } from '../../../shared/constants/api-endpoint';
import { ServerException } from '../../../shared/constants/server-exceptions';
import { SigninRequestModel, SigninResponseModel } from '../../../shared/models/signin.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
  fetchAuthData(credentails: SigninRequestModel): Observable<SigninResponseModel> {
    return this.http.post<SigninResponseModel>(API_ENDPOINT.LOGIN, credentails).pipe(
      catchError((error: HttpErrorResponse) => {
        const loginException: ServerException = error.error;
        return throwError(() => loginException);
      })
    );
  }

  fetchRegistration(registrationCredentails: SignupRequestModel): Observable<null> {
    return this.http.post(API_ENDPOINT.REGISTRATION, registrationCredentails).pipe(
      map(() => null),
      catchError((error: HttpErrorResponse) => {
        const signupException: ServerException = error.error;
        return throwError(() => signupException);
      })
    );
  }

  getProfileData(): Observable<UserModel> {
    return this.http.get<UserModel>(API_ENDPOINT.PROFILE).pipe(
      catchError((error: HttpErrorResponse) => {
        const profileException: ServerException = error.error;
        return throwError(() => profileException);
      })
    );
  }

  putProfileName(newName: NewNameModel): Observable<null> {
    return this.http.put(API_ENDPOINT.PROFILE, newName).pipe(
      map(() => null),
      catchError((error: HttpErrorResponse) => {
        const profileException: ServerException = error.error;
        return throwError(() => profileException);
      })
    );
  }

  deleteProfile(): Observable<null> {
    return this.http.delete(API_ENDPOINT.LOGOUT).pipe(
      map(() => null),
      catchError((error: HttpErrorResponse) => {
        const profileException: ServerException = error.error;
        return throwError(() => profileException);
      })
    );
  }

  getGroupsList(): Observable<GroupListModel> {
    return this.http.get<GroupListModel>(API_ENDPOINT.GROUPS_LIST).pipe(
      catchError((error: HttpErrorResponse) => {
        const groupsException: ServerException = error.error;
        return throwError(() => groupsException);
      })
    );
  }
}
