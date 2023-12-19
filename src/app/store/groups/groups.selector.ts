import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { DialogItemModel, GroupItemModel } from 'src/app/shared/models';

import { GroupsStateModel } from './groups.state';

const selectGroupsStore = createFeatureSelector<GroupsStateModel>('groups');

export const selectGroups = createSelector(selectGroupsStore, (state) => state?.Items || []);
export const selectGroupsCount = createSelector(selectGroupsStore, (state) => state?.Count || 0);
export const selectGroupByID = (id: string): MemoizedSelector<object, GroupItemModel | undefined> =>
  createSelector(selectGroupsStore, (state) => state?.Items?.find((i) => i.id.S === id));
export const selectGroupDialogsByID = (id: string): MemoizedSelector<object, never[] | DialogItemModel[]> =>
  createSelector(
    selectGroupsStore,
    (state) =>
      state?.Items?.find((i) => i.id.S === id)
        ?.dialogs?.Items.map((item) => ({ ...item }))
        .sort((currentItem, nextItem) => {
          const currentDate = Number(currentItem.createdAt.S);
          const nextDate = Number(nextItem.createdAt.S);

          if (currentDate > nextDate) {
            return 1;
          }
          if (currentDate < nextDate) {
            return -1;
          }
          return 0;
        }) || []
  );
