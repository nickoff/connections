import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CoreComponent } from './core/core.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CoreComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'connections';
}
