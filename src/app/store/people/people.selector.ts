import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { PeopleItemModel } from 'src/app/shared/models';

import { PeopleStateModel } from './people.state';

const selectPeopleStore = createFeatureSelector<PeopleStateModel>('people');
const myUid = localStorage.getItem('uid');

export const selectPeople = createSelector(
  selectPeopleStore,
  (state) => state?.Items.filter((i) => i.uid.S !== myUid) || []
);
export const selectPeopleCount = createSelector(selectPeopleStore, (state) => state?.Count || 0);
export const selectPeopleByID = (uid: string): MemoizedSelector<object, PeopleItemModel | undefined> =>
  createSelector(selectPeopleStore, (state) => state?.Items?.find((i) => i.uid.S === uid));
export const selectPeopleNameByID = (uid: string): MemoizedSelector<object, string> =>
  createSelector(selectPeopleStore, (state) => state?.Items?.find((i) => i.uid.S === uid)?.name.S || 'Unknown user');
