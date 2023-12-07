import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

const isAuthenticated = (): boolean => !!localStorage.getItem('token');

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);

  return of(isAuthenticated() ? true : router.parseUrl('signin'));
};
