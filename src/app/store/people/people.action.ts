import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PeopleListModel } from 'src/app/shared/models';

import { PEOPLE_ACTION } from './people.types';

const getPeople = createAction(PEOPLE_ACTION.GET);
const getPeopleSuccess = createAction(PEOPLE_ACTION.GET_SUCCESS, props<{ people: PeopleListModel }>());
const getPeopleFail = createAction(PEOPLE_ACTION.GET_FAIL, props<{ error: HttpErrorResponse }>());

export { getPeople, getPeopleFail, getPeopleSuccess };
