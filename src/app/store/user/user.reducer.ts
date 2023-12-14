import { createReducer, on } from '@ngrx/store';

import { InitialUserStateModel, USER_ACTIONS, UserStateModel } from './index';

export const userApireducer = createReducer<UserStateModel>(
  InitialUserStateModel,
  on(USER_ACTIONS.getUser, (state): UserStateModel => state),
  on(USER_ACTIONS.getUserSuccess, (_state, { user }): UserStateModel => user),
  on(USER_ACTIONS.getUserFail, (state): UserStateModel => state),
  on(USER_ACTIONS.updateUser, (state): UserStateModel => state),
  on(USER_ACTIONS.updateUserSuccess, (state, { update }): UserStateModel => ({ ...state, ...update })),
  on(USER_ACTIONS.logoutUser, (state): UserStateModel => state),
  on(USER_ACTIONS.logoutUserSuccess, (): UserStateModel => InitialUserStateModel),
  on(USER_ACTIONS.logoutUserFail, (state): UserStateModel => state)
);
