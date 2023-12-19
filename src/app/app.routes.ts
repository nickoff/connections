import { Routes } from '@angular/router';

import { SigninComponent } from './auth/pages/signin/signin.component';
import { ConversationComponent } from './connections/pages/conversation/conversation.component';
import { GroupComponent } from './connections/pages/group/group.component';
import { PeopleAndGroupsComponent } from './connections/pages/people-and-groups/people-and-groups.component';
import { authGuard } from './core/guards/auth.guard';
import { MainComponent } from './core/pages/main/main.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: MainComponent,
    children: [
      {
        path: '',
        component: PeopleAndGroupsComponent
      },
      {
        path: 'profile',
        loadChildren: () => import('./auth/pages/profile/profile.routes').then((m) => m.routes)
      },
      {
        path: 'group/:id',
        component: GroupComponent
      },
      {
        path: 'conversation/:id',
        component: ConversationComponent
      }
    ]
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
