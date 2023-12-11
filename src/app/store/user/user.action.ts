import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/shared/models/user.model';

import { USER_ACTION } from './user.types';

export const getUser = createAction(USER_ACTION.GET);
export const getUserSuccess = createAction(USER_ACTION.GET_SUCCESS, props<{ user: UserModel }>());
export const getUserFail = createAction(USER_ACTION.GET_FAIL, props<{ error: HttpErrorResponse }>());
