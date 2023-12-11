import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { State } from './root-state';
import { userApireducer } from './user/user.reducer';

const reducers: ActionReducerMap<State> = {
  user: userApireducer
};

const metaReducers: MetaReducer<State>[] = [];

export { metaReducers, reducers };
