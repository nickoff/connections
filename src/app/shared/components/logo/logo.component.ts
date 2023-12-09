import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { LOGO_ICON } from '../constants/logo';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIconLiteral('logo-icon', sanitizer.bypassSecurityTrustHtml(LOGO_ICON));
  }
}
