import { GroupsStateModel } from './groups';
import { UserStateModel } from './user';

export interface State {
  user: UserStateModel;
  groups: GroupsStateModel;
}
