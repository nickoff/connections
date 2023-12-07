import { FormControl } from '@angular/forms';

import { SigninModel } from './signin.model';

export interface SignupModel extends SigninModel {
  name: FormControl<string>;
}
