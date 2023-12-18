import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading/loading.services';
import { TimerService } from 'src/app/core/services/timer/timer.service';
import { GroupItemModel, PeopleItemModel } from 'src/app/shared/models';
import { GROUPS_ACTIONS, selectGroupByID, selectGroups } from 'src/app/store/groups';
import { PEOPLE_ACTIONS, selectPeople, selectPeopleByID } from 'src/app/store/people';

import { ModalDeleteGroupComponent } from '../../components';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, ScrollingModule, MatInputModule, MatIconModule],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent implements OnInit {
  groupsList$ = this.store.select(selectGroups);
  peopleList$ = this.store.select(selectPeople);
  group$?: Observable<GroupItemModel>;
  groupOwner$?: Observable<PeopleItemModel>;
  myUid = localStorage.getItem('uid');
  private timer = this.timerService.createTimer('groupDialog');
  countdownSub$ = this.timer && this.timer.countdownStatus;
  disabledSub$ = this.timer && this.timer.disabledStatus;
  isLoading$ = this.loadingService.getLoading;

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private store: Store,
    private timerService: TimerService,
    public dialog: MatDialog,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.groupsList$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((groups) => {
      if (groups.length === 0) {
        this.store.dispatch(GROUPS_ACTIONS.getGroups());
      }
      this.cdr.markForCheck();
    });

    this.peopleList$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((people) => {
      if (people.length === 0) {
        this.store.dispatch(PEOPLE_ACTIONS.getPeople());
      }
      this.cdr.markForCheck();
    });

    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const { id } = params;
      this.group$ = this.store.select(selectGroupByID(id)) as Observable<GroupItemModel>;
      this.group$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((group) => {
        if (group) {
          this.groupOwner$ = this.store.select(selectPeopleByID(group.createdBy.S)) as Observable<PeopleItemModel>;
        }
        this.cdr.markForCheck();
      });
      this.cdr.markForCheck();
    });
  }

  handlerClickDeleteGroup(): void {
    if (!this.group$) return;
    this.group$
      .pipe(
        take(1),
        filter((group) => !!group?.id?.S)
      )
      .subscribe((group) => {
        this.deleteGroup('500ms', '300ms', group.id.S);
      });
  }

  private deleteGroup(enterAnimationDuration: string, exitAnimationDuration: string, id: string): void {
    this.dialog.open(ModalDeleteGroupComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      panelClass: 'modal-group',
      id
    });
  }

  starTimer(): void {
    this.timer && this.timer.startCountDown();
  }
}
