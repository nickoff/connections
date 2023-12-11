export interface UserModel<T = { S: string }> {
  name: T;
  email: T;
  uid: T;
  createdAt: T;
}
