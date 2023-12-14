export interface GroupListModel {
  Count: number;
  Items: GroupItemModel[];
}

export interface GroupItemModel<T = { S: string }> {
  id: T;
  name: T;
  createdAt: T;
  createdBy: T;
}

export type NewGroupModel = {
  name: string;
};

export type NewGroupeResponseModel = {
  groupID: string;
};
