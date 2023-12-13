import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { NavigateService } from 'src/app/core/services/navigate/navigate.service';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { SignupRequestModel } from 'src/app/shared/models/signup.model';

import { ERROR_EMAIL_MESSAGE, ERROR_NAME_MESSAGE, ERROR_PASSWORD_MESSAGE } from '../../constants';
import { AuthEmailErrors, AuthNameErrors, AuthPasswordErrors } from '../../enums';
import { SignupModel } from '../../models';
import { validateName } from '../../services/validate-name.service';
import { validatePasswordStrength } from '../../services/validate-password.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [LogoComponent, RouterLink, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(500)]),
      transition(':enter', [query('li', [style({ opacity: 0 }), animate(300)])]),
      transition(':leave', animate(500, style({ opacity: 0 })))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  isSubmitted = false;
  isButtonDisabled = true;
  isLoading = false;

  registrationCredentails: FormGroup<SignupModel> = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, validateName()] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, validatePasswordStrength()] })
  });

  password = this.registrationCredentails.controls.password;
  email = this.registrationCredentails.controls.email;
  name = this.registrationCredentails.controls.name;

  errorKeys?: string[];
  isShowEmailError = false;
  isShowNameError = false;
  isShowPasswordError = false;
  isShowNonRequiredPasswordErrors = false;
  emailErrors?: string;
  nameErrors?: string;
  passwordErrors?: string;
  nonRequiredPasswordError?: ValidationErrors;

  constructor(
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private navigate: NavigateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registrationCredentails.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.refreshErrorsState();
      this.registrationCredentails.valid ? (this.isButtonDisabled = false) : (this.isButtonDisabled = true);
      this.cdr.markForCheck();
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.refreshErrorsState();

    if (!this.registrationCredentails.valid) return;
    this.isButtonDisabled = true;
    this.signIn(this.registrationCredentails.value as SignupRequestModel);
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

  private getShowNameError(): boolean {
    return this.name.errors !== null && this.name.errors && (this.name.dirty || this.isSubmitted);
  }

  private getNameErrors(): string {
    return (
      this.name.errors !== null &&
      ((this.name.errors[AuthNameErrors.onlyLettersOrSpaces] && ERROR_NAME_MESSAGE.onlyLettersOrSpaces) ||
        (this.name.errors[AuthNameErrors.required] && ERROR_NAME_MESSAGE.required) ||
        (this.name.errors[AuthNameErrors.maxLengthName] && ERROR_NAME_MESSAGE.maxLengthName))
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
    this.isShowNameError = this.getShowNameError();
    this.nameErrors = this.getNameErrors();
    this.isShowPasswordError = this.getShowPasswordError();
    this.passwordErrors = this.getPasswordErrors();
    this.isShowNonRequiredPasswordErrors = this.getShowNonRequiredPasswordErrors();
    this.nonRequiredPasswordError = this.getNonRequiredPasswordError();
  }

  private signIn(registrationCredentails: SignupRequestModel): void {
    this.isLoading = true;
    this.apiService
      .fetchRegistration(registrationCredentails)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading = false;
          const snackBarRef = this.snackBar.open(
            `✔️ OK! ${registrationCredentails.name} successfully registered! ✔️`,
            '',
            {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['ok-snackbar']
            }
          );
          snackBarRef
            .afterDismissed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
              this.navigate.navigateToSignin();
              this.cdr.markForCheck();
            });
          this.cdr.markForCheck();
        },
        error: () => {
          this.isButtonDisabled = false;
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
  }
}
