export interface GroupListModel {
  Count: number;
  Items: GroupItemModel[];
}

export interface GroupItemModel<T = { S: string }> {
  id: T;
  name: T;
  createdAt: T;
  createdBy: T;
  dialogs: DialogsGroupModel | null;
  lastUpdated: string | null;
}

export type NewGroupResponseModel = {
  groupID: string;
};

export interface DialogsGroupModel {
  Count: number;
  Items: DialogItemModel[];
}

export interface DialogItemModel<T = { S: string }> {
  authorID: T;
  message: T;
  createdAt: T;
}
