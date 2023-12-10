import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';

import { LogoComponent } from '../../../shared/components/logo/logo.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LogoComponent, RouterLink]
})
export class NotFoundComponent {
  currentUrl: string = '';

  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.currentUrl = `${environment.BASE_URL}${router.url}`;
    });
  }
}
