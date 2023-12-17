export interface PeopleListModel {
  Count: number;
  Items: PeopleItemModel[];
}

export interface PeopleItemModel<T = { S: string }> {
  uid: T;
  name: T;
  conversationId: T | null;
}
