import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { groupsApiReducer } from './groups/groups.reducer';
import { State } from './root-state';
import { userApireducer } from './user/user.reducer';

const reducers: ActionReducerMap<State> = {
  user: userApireducer,
  groups: groupsApiReducer
};

const metaReducers: MetaReducer<State>[] = [];

export { metaReducers, reducers };
