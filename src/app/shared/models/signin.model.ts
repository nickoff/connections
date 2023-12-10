export interface SigninRequestModel {
  email: string;
  password: string;
}

export interface SigninResponseModel {
  token: string;
  uid: string;
}
