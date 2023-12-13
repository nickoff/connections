import { FormControl } from '@angular/forms';

export interface ProfileUserModel {
  email: FormControl<string>;
  uid: FormControl<string>;
  name: FormControl<string>;
  createdAt: FormControl<string>;
}
