import { Routes } from '@angular/router';

import { MainComponent } from './core/pages/main/main.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./core/pages/profile/profile.routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
