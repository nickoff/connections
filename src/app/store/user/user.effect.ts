import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { OkSnackbarService } from 'src/app/core/services/snackbar/ok-snackbar.service';

import { selectUserValue, USER_ACTIONS } from './index';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store,
    private okSnackbar: OkSnackbarService
  ) {}

  feachUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(USER_ACTIONS.getUser),
      switchMap(() => this.store.select(selectUserValue)),
      filter((user) => !user),
      switchMap(() =>
        this.apiService.getProfileData().pipe(
          map((user) => {
            this.okSnackbar.openSnackbar('Profile data');
            return USER_ACTIONS.getUserSuccess({ user });
          })
        )
      )
    );
  });
}
