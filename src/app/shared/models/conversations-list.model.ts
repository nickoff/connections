export interface ConversationsListModel {
  Count: number;
  Items: ConversationItemModel[];
}

export interface ConversationItemModel<T = { S: string }> {
  id: T;
  companionID: T;
}
