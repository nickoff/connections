import { createReducer, on } from '@ngrx/store';

import { PEOPLE_ACTIONS } from '.';
import { InitialPeopleStateModel, PeopleStateModel } from './people.state';

export const peopleApiReducer = createReducer<PeopleStateModel>(
  InitialPeopleStateModel,
  on(PEOPLE_ACTIONS.getPeople, (state): PeopleStateModel => state),
  on(PEOPLE_ACTIONS.getPeopleSuccess, (_state, { people }): PeopleStateModel => people),
  on(PEOPLE_ACTIONS.getPeopleFail, (state): PeopleStateModel => state)
);
