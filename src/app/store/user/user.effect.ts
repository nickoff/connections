/* eslint-disable no-return-assign */
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';
import { ApiService } from 'src/app/core/services/api/api.service';
import { OkSnackbarService } from 'src/app/core/services/snackbar/ok-snackbar.service';

import { selectUserValue, USER_ACTIONS } from './index';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store,
    private okSnackbar: OkSnackbarService,
    private userService: UserService
  ) {}

  feachUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(USER_ACTIONS.getUser),
      switchMap(() => this.store.select(selectUserValue)),
      filter((user) => !user),
      switchMap(() =>
        this.apiService.getProfileData().pipe(
          map((user) => {
            this.okSnackbar.openSnackbar('Profile loaded');
            return USER_ACTIONS.getUserSuccess({ user });
          }),
          catchError((error) => {
            return of(USER_ACTIONS.getUserFail({ error }));
          })
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(USER_ACTIONS.updateUser),
      concatLatestFrom(() => this.store.select(selectUserValue)),
      switchMap(([user, action]) => {
        if (!action) return of({ type: 'NO_USER_ACTION', message: 'No user action' });
        return this.apiService.putProfileName(user.newName).pipe(
          map(() => {
            const updatedUser = {
              ...action,
              name: { S: user.newName.name }
            };
            this.okSnackbar.openSnackbar('Profile updated');
            return USER_ACTIONS.updateUserSuccess({ update: updatedUser });
          }),
          catchError((error) => {
            return of(USER_ACTIONS.updateUserFail({ error }));
          })
        );
      })
    );
  });

  logoutUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(USER_ACTIONS.logoutUser),
        switchMap(() =>
          this.apiService.deleteProfile().pipe(
            map(() => {
              this.userService.logout();
              this.okSnackbar.openSnackbar('Logout');
              return USER_ACTIONS.logoutUserSuccess();
            }),
            catchError((error) => {
              return of(USER_ACTIONS.logoutUserFail({ error }));
            })
          )
        )
      );
    },
    { dispatch: false }
  );
}
