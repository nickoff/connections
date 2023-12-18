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

  addGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GROUPS_ACTIONS.createGroup),
      switchMap((action) =>
        this.apiService.createGroup(action.newGroupName).pipe(
          map((newGroupId) => {
            this.okSnackbar.openSnackbar('Group created');
            const myUid = localStorage.getItem('uid');
            if (!myUid) return { type: 'NO_GROUP_ACTION', message: 'No group action' };
            const newGroup = {
              id: { S: newGroupId.groupID },
              name: { S: action.newGroupName },
              createdAt: { S: new Date().getTime().toString() },
              createdBy: { S: myUid },
              dialogs: null,
              lastUpdated: null
            };
            return GROUPS_ACTIONS.createGroupSuccess({ newGroup });
          }),
          catchError((error) => {
            return of(GROUPS_ACTIONS.createGroupFail({ error }));
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

  feachGroupDialogs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GROUPS_ACTIONS.readeGroupDialogs),
      switchMap((action) =>
        this.apiService.readGroupDialogs(action.groupID).pipe(
          map((dialogs) => {
            this.okSnackbar.openSnackbar('Group dialogs loaded');
            return GROUPS_ACTIONS.readeGroupDialogsSuccess({ groupID: action.groupID, dialogs });
          }),
          catchError((error) => {
            return of(GROUPS_ACTIONS.readeGroupDialogsFail({ error }));
          })
        )
      )
    );
  });
}
