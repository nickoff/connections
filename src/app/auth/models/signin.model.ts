import { FormControl } from '@angular/forms';

export interface SigninModel {
  email: FormControl<string>;
  password: FormControl<string>;
}
