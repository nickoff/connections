import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserStateModel } from './user.state';

const selectUserStore = createFeatureSelector<UserStateModel>('user');

export const selectUserValue = createSelector(selectUserStore, (state) => state);
