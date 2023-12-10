import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  constructor(private router: Router) {}

  navigateToRoot(): void {
    this.router.navigate(['']);
  }

  navigateToSignin(): void {
    this.router.navigate(['signin']);
  }
}
