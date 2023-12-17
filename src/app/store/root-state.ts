import { GroupsStateModel } from './groups';
import { PeopleStateModel } from './people';
import { UserStateModel } from './user';

export interface State {
  user: UserStateModel;
  groups: GroupsStateModel;
  people: PeopleStateModel;
}
