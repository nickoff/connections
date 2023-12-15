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

export type NewGroupResponseModel = {
  groupID: string;
};
