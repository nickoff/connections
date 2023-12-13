import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading/loading.services';
import { NewNameModel, UserModel } from 'src/app/shared/models/user.model';
import { selectUserValue, USER_ACTIONS } from 'src/app/store/user';

import { ProfileUserModel } from '../../models/profile-user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  isNameEditable = false;
  user$?: Observable<UserModel>;
  isLoading$ = this.loadingService.getLoading;

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
    private cdr: ChangeDetectorRef,
    private loadingService: LoadingService
  ) {
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
    this.isNameEditable = true;
  }

  editSave(): void {
    const updateName = this.profileUser.value.name;
    if (!updateName) return;

    const newName: NewNameModel = {
      name: updateName
    };
    this.store.dispatch(USER_ACTIONS.updateUser({ newName }));
  }

  editCancel(): void {
    this.setUserFromStore();
  }

  private setUserFromStore(): void {
    this.user$ = this.store.select(selectUserValue) as Observable<UserModel>;
    this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      if (user) {
        this.profileUser.setValue({
          email: user.email ? user.email.S : '',
          uid: user.uid ? user.uid.S : '',
          name: user.name ? user.name.S : '',
          createdAt: user.createdAt ? this.getLocalTime(Number(user.createdAt.S)) : ''
        });
      }
      this.isNameEditable = false;
      this.cdr.markForCheck();
    });
  }
}
