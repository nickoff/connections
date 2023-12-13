import { DatePipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user.model';
import { selectUserValue, USER_ACTIONS } from 'src/app/store/user';

import { ProfileUserModel } from '../../models/profile-user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  isNameEditable = false;
  isButtonDisabled = false;
  isLoading = false;
  user$?: Observable<UserModel>;

  profileUser: FormGroup<ProfileUserModel> = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    uid: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    createdAt: new FormControl('', { nonNullable: true })
  });

  constructor(
    private datePipe: DatePipe,
    private store: Store,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef
  ) {
    this.isLoading = true;
    this.store.dispatch(USER_ACTIONS.getUser());
  }
  ngOnInit(): void {
    this.setUserFromStore();
  }

  getLocalTime(timestamp: number): string {
    const date = new Date(timestamp);
    return this.datePipe.transform(date, 'medium') || '';
  }

  editName(): void {
    this.isNameEditable = !this.isNameEditable;
  }

  editCancel(): void {
    this.setUserFromStore();
    this.isNameEditable = !this.isNameEditable;
  }

  private setUserFromStore(): void {
    this.user$ = this.store.select(selectUserValue) as Observable<UserModel>;
    this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      if (user) {
        this.isLoading = false;
      }

      this.profileUser.setValue({
        email: user.email.S,
        uid: user.uid.S,
        name: user.name.S,
        createdAt: this.getLocalTime(Number(user.createdAt.S))
      });
      this.cdr.markForCheck();
    });
  }
}
