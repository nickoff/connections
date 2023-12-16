import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { OkSnackbarService } from 'src/app/core/services/snackbar/ok-snackbar.service';

import { GROUPS_ACTIONS } from '.';

@Injectable()
export class GroupsEffect {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private okSnackbar: OkSnackbarService
  ) {}

  feachGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GROUPS_ACTIONS.getGroups),
      switchMap(() =>
        this.apiService.getGroupsList().pipe(
          map((groups) => {
            this.okSnackbar.openSnackbar('Groups list loaded');
            return GROUPS_ACTIONS.getGroupsSuccess({ groups });
          }),
          catchError((error) => {
            return of(GROUPS_ACTIONS.getGroupsFail({ error }));
          })
        )
      )
    );
  });

  deleteGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GROUPS_ACTIONS.deleteGroup),
      switchMap((action) =>
        this.apiService.deleteGroup(action.groupID).pipe(
          map(() => {
            this.okSnackbar.openSnackbar('Group deleted');
            return GROUPS_ACTIONS.deleteGroupSuccess({ groupID: action.groupID });
          }),
          catchError((error) => {
            return of(GROUPS_ACTIONS.deleteGroupFail({ error }));
          })
        )
      )
    );
  });
}
