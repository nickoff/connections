import { Routes } from '@angular/router';

import { SigninComponent } from './auth/pages/signin/signin.component';
import { authGuard } from './core/guards/auth.guard';
import { MainComponent } from './core/pages/main/main.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./core/pages/profile/profile.routes').then((m) => m.routes)
      }
    ],
    canActivate: [authGuard],
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    loadComponent: () => import('./auth/pages/signup/signup.component').then((m) => m.SignupComponent)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
