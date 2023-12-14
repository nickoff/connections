import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { NewNameModel, UserModel } from 'src/app/shared/models/user.model';

import { USER_ACTION } from './user.types';

export const getUser = createAction(USER_ACTION.GET);
export const getUserSuccess = createAction(USER_ACTION.GET_SUCCESS, props<{ user: UserModel }>());
export const getUserFail = createAction(USER_ACTION.GET_FAIL, props<{ error: HttpErrorResponse }>());
export const updateUser = createAction(USER_ACTION.UPDATE, props<{ newName: NewNameModel }>());
export const updateUserSuccess = createAction(USER_ACTION.UPDATE_SUCCESS, props<{ update: UserModel }>());
export const updateUserFail = createAction(USER_ACTION.UPDATE_FAIL, props<{ error: HttpErrorResponse }>());
export const logoutUser = createAction(USER_ACTION.LOGOUT);
export const logoutUserSuccess = createAction(USER_ACTION.LOGOUT_SUCCESS);
export const logoutUserFail = createAction(USER_ACTION.LOGOUT_FAIL, props<{ error: HttpErrorResponse }>());
