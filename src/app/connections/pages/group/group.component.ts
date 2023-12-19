import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading/loading.services';
import { TimerService } from 'src/app/core/services/timer/timer.service';
import { DialogItemModel, GroupItemModel, PeopleItemModel } from 'src/app/shared/models';
import { UserIdToNamePipe } from 'src/app/shared/pipes/uid-to-name.pipe';
import { GROUPS_ACTIONS, selectGroupByID, selectGroupDialogsByID, selectGroups } from 'src/app/store/groups';
import { PEOPLE_ACTIONS, selectPeople, selectPeopleByID } from 'src/app/store/people';

import { ModalDeleteGroupComponent } from '../../components';

export interface MessageGroupFormModel {
  message: FormControl<string>;
}

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, ScrollingModule, MatInputModule, MatIconModule, UserIdToNamePipe, ReactiveFormsModule],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent implements OnInit {
  pageLoad = false;
  groupsList$ = this.store.select(selectGroups);
  peopleList$ = this.store.select(selectPeople);
  groupDialogs$?: Observable<DialogItemModel[]>;
  group$?: Observable<GroupItemModel>;
  groupOwner$?: Observable<PeopleItemModel>;
  myUid = localStorage.getItem('uid');
  private timer = this.timerService.createTimer('groupDialog');
  countdownSub$ = this.timer && this.timer.countdownStatus;
  disabledSub$ = this.timer && this.timer.disabledStatus;
  isLoading$ = this.loadingService.getLoading;

  messageForm: FormGroup<MessageGroupFormModel> = new FormGroup({
    message: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  message = this.messageForm.controls.message;

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
    this.initComponents();
  }

  handlerClickDeleteGroup(): void {
    if (!this.group$) return;
    this.group$
      .pipe(
        take(1),
        filter((group) => !!group?.id?.S),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((group) => {
        this.deleteGroup('500ms', '300ms', group.id.S);
        this.cdr.markForCheck();
      });
  }

  handlerClickSendMessage(): void {
    if (this.messageForm.invalid) return;

    this.group$?.pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe((group) => {
      if (!group?.id?.S || !this.messageForm.value.message) return;
      this.store.dispatch(
        GROUPS_ACTIONS.appendMessage({ groupID: group.id.S, message: this.messageForm.value.message })
      );
      this.messageForm.reset();
      this.cdr.markForCheck();
    });
  }

  starTimer(): void {
    this.updateMessage();
    this.timer && this.timer.startCountDown();
  }

  private updateMessage(): void {
    if (!this.group$) return;
    this.group$
      .pipe(
        take(1),
        filter((group) => !!group?.id?.S),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((group) => {
        if (group.lastUpdated) {
          this.store.dispatch(
            GROUPS_ACTIONS.updateGroupDialog({ groupID: group.id.S, dateLastMessage: group.lastUpdated })
          );
        }
        this.cdr.markForCheck();
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

  private initComponents(): void {
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
          this.groupDialogs$ = this.store.select(selectGroupDialogsByID(id)) as Observable<DialogItemModel[]>;
          this.groupDialogs$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((dialogs) => {
            if (dialogs.length === 0 && !group.lastUpdated && !this.pageLoad) {
              this.store.dispatch(GROUPS_ACTIONS.readGroupDialogs({ groupID: id }));
            }
            if (group.lastUpdated && !this.pageLoad) {
              this.store.dispatch(
                GROUPS_ACTIONS.updateGroupDialog({ groupID: id, dateLastMessage: group.lastUpdated })
              );
            }
            this.pageLoad = true;
            this.cdr.markForCheck();
          });
        }
        this.cdr.markForCheck();
      });
      this.cdr.markForCheck();
    });
  }
}
