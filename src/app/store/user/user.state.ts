import { UserModel } from 'src/app/shared/models/user.model';

export type UserStateModel = UserModel | null;

export const InitialUserStateModel: UserStateModel = null;
