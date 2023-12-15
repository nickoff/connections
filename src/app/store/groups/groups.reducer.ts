import { createReducer, on } from '@ngrx/store';

import { GROUPS_ACTIONS } from '.';
import { GroupsStateModel, InitialGroupsStateModel } from './groups.state';

export const groupsApiReducer = createReducer<GroupsStateModel>(
  InitialGroupsStateModel,
  on(GROUPS_ACTIONS.getGroups, (state): GroupsStateModel => state),
  on(GROUPS_ACTIONS.getGroupsSuccess, (_state, { groups }): GroupsStateModel => groups),
  on(GROUPS_ACTIONS.getGroupsFail, (state): GroupsStateModel => state),
  on(GROUPS_ACTIONS.createGroup, (state): GroupsStateModel => state),
  on(GROUPS_ACTIONS.createGroupSuccess, (state, { newGroup }): GroupsStateModel => {
    if (state) {
      return { ...state, Count: state.Count + 1, Items: [...state.Items, newGroup] };
    }
    return { Count: 1, Items: [newGroup] };
  }),
  on(GROUPS_ACTIONS.createGroupFail, (state): GroupsStateModel => state),
  on(GROUPS_ACTIONS.deleteGroup, (state): GroupsStateModel => state),
  on(GROUPS_ACTIONS.deleteGroupSuccess, (state, { groupID }): GroupsStateModel => {
    if (state) {
      return { ...state, Count: state.Count - 1, Items: state.Items.filter((i) => i.id.S !== groupID) };
    }
    return state;
  }),
  on(GROUPS_ACTIONS.deleteGroupFail, (state): GroupsStateModel => state)
);
