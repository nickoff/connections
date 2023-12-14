import { Injectable } from '@angular/core';
import { NavigateService } from 'src/app/core/services/navigate/navigate.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  cookies = document.cookie;

  constructor(private navigate: NavigateService) {}

  logout(): void {
    localStorage.clear();
    this.navigate.navigateToSignin();
    this.deleteCookires();
  }

  private deleteCookires(): void {
    this.cookies.split(';').forEach((cookie) => {
      cookie.trim();
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      this.cookies = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
  }
}
