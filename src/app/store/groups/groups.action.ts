import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { GroupItemModel, GroupListModel } from 'src/app/shared/models';

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

export {
  createGroup,
  createGroupFail,
  createGroupSuccess,
  deleteGroup,
  deleteGroupFail,
  deleteGroupSuccess,
  getGroups,
  getGroupsFail,
  getGroupsSuccess
};
