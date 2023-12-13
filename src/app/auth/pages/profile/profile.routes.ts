import { Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guards/auth.guard';

import { ProfileComponent } from './profile.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [authGuard]
  }
];
