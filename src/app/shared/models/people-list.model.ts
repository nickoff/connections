export interface PeopleListModel {
  Count: number;
  Items: PeopleItemModel[];
}

export interface PeopleItemModel<T = { S: string }> {
  uid: T;
  name: T;
  conversationId: T | null;
  lastUpdated: string | null;
  conversation: ConversionModel[] | null;
}

export interface ConversionModel<T = { S: string }> {
  authorID: T;
  message: T;
  createdAt: T;
}

export type ConversationResponseModel = {
  conversationID: string;
};
