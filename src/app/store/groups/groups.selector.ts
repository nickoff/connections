import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { GroupItemModel } from 'src/app/shared/models';

import { GroupsStateModel } from './groups.state';

const selectGroupsStore = createFeatureSelector<GroupsStateModel>('groups');

export const selectGroups = createSelector(selectGroupsStore, (state) => state?.Items || []);
export const selectGroupsCount = createSelector(selectGroupsStore, (state) => state?.Count || 0);
export const selectGroupByID = (id: string): MemoizedSelector<object, GroupItemModel | undefined> =>
  createSelector(selectGroupsStore, (state) => state?.Items?.find((i) => i.id.S === id));
