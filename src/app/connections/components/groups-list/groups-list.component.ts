import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadingService } from 'src/app/core/services/loading/loading.services';
import { TimerService } from 'src/app/core/services/timer/timer.service';
import { GROUPS_ACTIONS, selectGroups } from 'src/app/store/groups';

import { ModalAddGroupComponent } from '../modal-add-group/modal-add-group.component';
import { ModalDeleteGroupComponent } from '../modal-delete-group/modal-delete-group.component';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    ModalDeleteGroupComponent,
    RouterModule
  ],
  templateUrl: './groups-list.component.html',
  styleUrl: './groups-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsListComponent implements OnInit {
  private timer = this.timerService.createTimer('groupsList');
  pageLoaded = false;
  isLoading$ = this.loadingService.getLoading;
  groupsList$ = this.store.select(selectGroups);
  countdownSub$ = this.timer && this.timer.countdownStatus;
  disabledSub$ = this.timer && this.timer.disabledStatus;
  myUid = localStorage.getItem('uid');

  constructor(
    private loadingService: LoadingService,
    private store: Store,
    private timerService: TimerService,
    public dialog: MatDialog,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.groupsList$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((groups) => {
      if (groups.length === 0 && !this.pageLoaded) {
        this.store.dispatch(GROUPS_ACTIONS.getGroups());
      }
      this.pageLoaded = true;
      this.cdr.markForCheck();
    });
  }

  deleteGroup(enterAnimationDuration: string, exitAnimationDuration: string, id: string): void {
    this.dialog.open(ModalDeleteGroupComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      panelClass: 'modal-group',
      id
    });
  }

  addGroup(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ModalAddGroupComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      panelClass: 'modal-group'
    });
  }

  starTimer(): void {
    this.updateList();
    this.timer && this.timer.startCountDown();
  }

  private updateList(): void {
    this.store.dispatch(GROUPS_ACTIONS.getGroups());
  }
}
