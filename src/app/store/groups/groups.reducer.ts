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
  on(GROUPS_ACTIONS.deleteGroupFail, (state): GroupsStateModel => state),
  on(GROUPS_ACTIONS.readGroupDialogs, (state): GroupsStateModel => state),
  on(GROUPS_ACTIONS.readGroupDialogsSuccess, (state, { groupID, dialogs }): GroupsStateModel => {
    if (state) {
      const lastUpdated = String(new Date().getTime());
      return { ...state, Items: state.Items.map((i) => (i.id.S === groupID ? { ...i, dialogs, lastUpdated } : i)) };
    }
    return state;
  }),
  on(GROUPS_ACTIONS.readGroupDialogsFail, (state): GroupsStateModel => state),
  on(GROUPS_ACTIONS.updateGroupDialog, (state): GroupsStateModel => state),
  on(GROUPS_ACTIONS.updateGroupDialogSuccess, (state, { groupID, newDialogs }): GroupsStateModel => {
    if (state) {
      const lastUpdated = String(new Date().getTime());
      return {
        ...state,
        Items: state.Items.map((i) =>
          i.id.S === groupID
            ? {
                ...i,
                dialogs: {
                  ...i.dialogs,
                  Count: (i.dialogs?.Count || 0) + (newDialogs.Count || 0),
                  Items: [...(i.dialogs?.Items || []), ...newDialogs.Items]
                },
                lastUpdated
              }
            : i
        )
      };
    }
    return state;
  }),
  on(GROUPS_ACTIONS.appendMessage, (state): GroupsStateModel => state),
  on(GROUPS_ACTIONS.appendMessageSuccess, (state, { groupID, newDialog }): GroupsStateModel => {
    if (state) {
      const lastUpdated = String(new Date().getTime());

      return {
        ...state,
        Items: state.Items.map((i) =>
          i.id.S === groupID
            ? {
                ...i,
                dialogs: {
                  ...i.dialogs,
                  Count: (i.dialogs?.Count || 0) + 1,
                  Items: [...(i.dialogs?.Items || []), newDialog]
                },
                lastUpdated
              }
            : i
        )
      };
    }
    return state;
  })
);
