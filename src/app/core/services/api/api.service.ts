import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DialogsGroupModel, GroupListModel, NewGroupResponseModel, PeopleListModel } from 'src/app/shared/models';
import { ConversationsListModel } from 'src/app/shared/models/conversations-list.model';
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

  createGroup(groupName: string): Observable<NewGroupResponseModel> {
    return this.http.post<NewGroupResponseModel>(API_ENDPOINT.GROUPS_CREATE, { name: groupName }).pipe(
      catchError((error: HttpErrorResponse) => {
        const groupsException: ServerException = error.error;
        return throwError(() => groupsException);
      })
    );
  }

  deleteGroup(id: string): Observable<null> {
    const params = new HttpParams().set('groupID', id);

    return this.http.delete(API_ENDPOINT.GROUPS_DELETE, { params }).pipe(
      map(() => null),
      catchError((error: HttpErrorResponse) => {
        const groupsException: ServerException = error.error;
        return throwError(() => groupsException);
      })
    );
  }

  getPeopleList(): Observable<PeopleListModel> {
    return this.http.get<PeopleListModel>(API_ENDPOINT.USERS).pipe(
      catchError((error: HttpErrorResponse) => {
        const peopleException: ServerException = error.error;
        return throwError(() => peopleException);
      })
    );
  }

  getConversationsList(): Observable<ConversationsListModel> {
    return this.http.get<ConversationsListModel>(API_ENDPOINT.CONVERSATIONS_LIST).pipe(
      catchError((error: HttpErrorResponse) => {
        const peopleException: ServerException = error.error;
        return throwError(() => peopleException);
      })
    );
  }

  readGroupDialogs(groupId: string): Observable<DialogsGroupModel> {
    return this.http.get<DialogsGroupModel>(API_ENDPOINT.GROUPS_READ, { params: { groupID: groupId } }).pipe(
      catchError((error: HttpErrorResponse) => {
        const peopleException: ServerException = error.error;
        return throwError(() => peopleException);
      })
    );
  }

  updateGroupDialogs(groupId: string, dateLastMessage: number): Observable<DialogsGroupModel> {
    return this.http
      .get<DialogsGroupModel>(API_ENDPOINT.GROUPS_READ, { params: { groupID: groupId, since: dateLastMessage } })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const peopleException: ServerException = error.error;
          return throwError(() => peopleException);
        })
      );
  }

  appendMessageToGroupDialog(groupId: string, text: string): Observable<null> {
    return this.http.post(API_ENDPOINT.GROUPS_APPEND, { groupID: groupId, message: text }).pipe(
      map(() => null),
      catchError((error: HttpErrorResponse) => {
        const peopleException: ServerException = error.error;
        return throwError(() => peopleException);
      })
    );
  }
}
