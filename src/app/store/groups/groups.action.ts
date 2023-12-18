import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { DialogItemModel, DialogsGroupModel, GroupItemModel, GroupListModel } from 'src/app/shared/models';

import { GROUPS_ACTION } from './groups.types';

const getGroups = createAction(GROUPS_ACTION.GET);
const getGroupsSuccess = createAction(GROUPS_ACTION.GET_SUCCESS, props<{ groups: GroupListModel }>());
const getGroupsFail = createAction(GROUPS_ACTION.GET_FAIL, props<{ error: HttpErrorResponse }>());
const createGroup = createAction(GROUPS_ACTION.CREATE_GROUP, props<{ newGroupName: string }>());
const createGroupSuccess = createAction(GROUPS_ACTION.CREATE_GROUP_SUCCESS, props<{ newGroup: GroupItemModel }>());
const createGroupFail = createAction(GROUPS_ACTION.CREATE_GROUP_FAIL, props<{ error: HttpErrorResponse }>());
const deleteGroup = createAction(GROUPS_ACTION.DELETE_GROUP, props<{ groupID: string }>());
const deleteGroupSuccess = createAction(GROUPS_ACTION.DELETE_GROUP_SUCCESS, props<{ groupID: string }>());
const deleteGroupFail = createAction(GROUPS_ACTION.DELETE_GROUP_FAIL, props<{ error: HttpErrorResponse }>());
const readGroupDialogs = createAction(GROUPS_ACTION.READ_GROUP_DIALOGS, props<{ groupID: string }>());
const readGroupDialogsSuccess = createAction(
  GROUPS_ACTION.READ_GROUP_DIALOGS_SUCCESS,
  props<{ groupID: string; dialogs: DialogsGroupModel }>()
);
const readGroupDialogsFail = createAction(GROUPS_ACTION.READ_GROUP_DIALOGS_FAIL, props<{ error: HttpErrorResponse }>());
const updateGroupDialog = createAction(
  GROUPS_ACTION.UPDATE_GROUP_DIALOG,
  props<{ groupID: string; dateLastMessage: string }>()
);
const updateGroupDialogSuccess = createAction(
  GROUPS_ACTION.UPDATE_GROUP_DIALOG_SUCCESS,
  props<{ groupID: string; newDialogs: DialogsGroupModel }>()
);
const updateGroupDialogFail = createAction(
  GROUPS_ACTION.UPDATE_GROUP_DIALOG_FAIL,
  props<{ error: HttpErrorResponse }>()
);
const appendMessage = createAction(GROUPS_ACTION.APPEND_MESSAGE, props<{ groupID: string; message: string }>());
const appendMessageSuccess = createAction(
  GROUPS_ACTION.APPEND_MESSAGE_SUCCESS,
  props<{ newMessage: DialogItemModel }>()
);
const appendMessageFail = createAction(GROUPS_ACTION.APPEND_MESSAGE_FAIL, props<{ error: HttpErrorResponse }>());

export {
  appendMessage,
  appendMessageFail,
  appendMessageSuccess,
  createGroup,
  createGroupFail,
  createGroupSuccess,
  deleteGroup,
  deleteGroupFail,
  deleteGroupSuccess,
  getGroups,
  getGroupsFail,
  getGroupsSuccess,
  readGroupDialogs,
  readGroupDialogsFail,
  readGroupDialogsSuccess,
  updateGroupDialog,
  updateGroupDialogFail,
  updateGroupDialogSuccess
};
