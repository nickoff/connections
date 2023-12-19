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
      ofType(GROUPS_ACTIONS.readGroupDialogs),
      switchMap((action) =>
        this.apiService.readGroupDialogs(action.groupID).pipe(
          map((dialogs) => {
            this.okSnackbar.openSnackbar('Group dialogs loaded');
            return GROUPS_ACTIONS.readGroupDialogsSuccess({ groupID: action.groupID, dialogs });
          }),
          catchError((error) => {
            return of(GROUPS_ACTIONS.readGroupDialogsFail({ error }));
          })
        )
      )
    );
  });

  updateGroupDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GROUPS_ACTIONS.updateGroupDialog),
      switchMap((action) =>
        this.apiService.updateGroupDialogs(action.groupID, Number(action.dateLastMessage)).pipe(
          map((newDialogs) => {
            this.okSnackbar.openSnackbar('Group dialogs updated');
            return GROUPS_ACTIONS.updateGroupDialogSuccess({ groupID: action.groupID, newDialogs });
          }),
          catchError((error) => {
            return of(GROUPS_ACTIONS.updateGroupDialogFail({ error }));
          })
        )
      )
    );
  });

  appendMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GROUPS_ACTIONS.appendMessage),
      switchMap((action) =>
        this.apiService.appendMessageToGroupDialog(action.groupID, action.message).pipe(
          map(() => {
            const newDialog = {
              message: { S: action.message },
              createdAt: { S: new Date().getTime().toString() },
              authorID: { S: localStorage.getItem('uid') || '' }
            };

            this.okSnackbar.openSnackbar('Message appended');
            return GROUPS_ACTIONS.appendMessageSuccess({ groupID: action.groupID, newDialog });
          }),
          catchError((error) => {
            return of(GROUPS_ACTIONS.appendMessageFail({ error }));
          })
        )
      )
    );
  });
}
