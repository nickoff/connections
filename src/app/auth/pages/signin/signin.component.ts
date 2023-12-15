import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LoadingService } from 'src/app/core/services/loading/loading.services';
import { NavigateService } from 'src/app/core/services/navigate/navigate.service';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { SigninRequestModel, SigninResponseModel } from 'src/app/shared/models/signin.model';

import { ERROR_EMAIL_MESSAGE, ERROR_PASSWORD_MESSAGE } from '../../constants';
import { AuthEmailErrors, AuthPasswordErrors } from '../../enums';
import { SigninModel } from '../../models';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [LogoComponent, RouterLink, ReactiveFormsModule, CommonModule, MatProgressBarModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(500)]),
      transition(':leave', animate(500, style({ opacity: 0 })))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {
  isSubmitted = false;
  isButtonDisabled = true;
  isLoading$ = this.loadingService.getLoading;

  credentails: FormGroup<SigninModel> = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  password = this.credentails.controls.password;
  email = this.credentails.controls.email;

  errorKeys?: string[];
  isShowEmailError = false;
  isShowPasswordError = false;
  emailErrors?: string;
  passwordErrors?: string;

  constructor(
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private navigate: NavigateService,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.credentails.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.refreshErrorsState();
      this.credentails.valid ? (this.isButtonDisabled = false) : (this.isButtonDisabled = true);
      this.cdr.markForCheck();
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.refreshErrorsState();

    if (!this.credentails.valid) return;
    this.isButtonDisabled = true;
    this.signIn(this.credentails.value as SigninRequestModel);
  }

  private getShowEmailError(): boolean {
    return this.email.errors !== null && this.email.errors && (this.email.dirty || this.isSubmitted);
  }

  private getEmailErrors(): string {
    return (
      this.email.errors !== null &&
      ((this.email.errors[AuthEmailErrors.invalidEmail] && ERROR_EMAIL_MESSAGE.email) ||
        (this.email.errors[AuthEmailErrors.required] && ERROR_EMAIL_MESSAGE.required))
    );
  }

  private getShowPasswordError(): boolean {
    return this.password.errors !== null && this.password.errors && (this.password.dirty || this.isSubmitted);
  }

  private getShowNonRequiredPasswordErrors(): boolean {
    return (
      this.password.errors !== null &&
      this.password.errors &&
      !this.password.errors[AuthPasswordErrors.required] &&
      this.password.dirty
    );
  }

  private getPasswordErrors(): string {
    return (
      this.password.errors !== null &&
      ((this.password.errors[AuthPasswordErrors.required] && ERROR_PASSWORD_MESSAGE.required) ||
        (this.password.errors && ERROR_PASSWORD_MESSAGE.validatePasswordStrength))
    );
  }

  private getPasswordErrorKeys(): string[] {
    return this.password.errors ? Object.keys(this.password.errors) : [];
  }

  private getNonRequiredPasswordError(): ValidationErrors | undefined {
    return this.password.errors ?? undefined;
  }

  private refreshErrorsState(): void {
    this.errorKeys = this.getPasswordErrorKeys();
    this.isShowEmailError = this.getShowEmailError();
    this.emailErrors = this.getEmailErrors();
    this.isShowPasswordError = this.getShowPasswordError();
    this.passwordErrors = this.getPasswordErrors();
  }

  private signIn(credentails: SigninRequestModel): void {
    this.apiService
      .fetchAuthData(credentails)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: SigninResponseModel) => {
          (Object.keys(response) as Array<keyof SigninResponseModel>).forEach((key) => {
            localStorage.setItem(key, response[key]);
          });
          localStorage.setItem('email', credentails.email);
          const snackBarRef = this.snackBar.open(`✔️ OK! We are glad to see you ${credentails.email} ✔️`, '', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['ok-snackbar']
          });
          snackBarRef
            .afterDismissed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
              this.navigate.navigateToRoot();
              this.cdr.markForCheck();
            });
          this.cdr.markForCheck();
        },
        error: () => {
          this.isButtonDisabled = false;
          this.cdr.markForCheck();
        }
      });
  }
}
