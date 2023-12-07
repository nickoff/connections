import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [LogoComponent, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {}
