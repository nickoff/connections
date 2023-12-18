import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { LoadingService } from 'src/app/core/services/loading/loading.services';
import { TimerService } from 'src/app/core/services/timer/timer.service';
import { PEOPLE_ACTIONS, selectPeople } from 'src/app/store/people';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule, MatIconModule],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleListComponent implements OnInit {
  private timer = this.timerService.createTimer('peopleList');
  isLoading$ = this.loadingService.getLoading;
  countdownSub$ = this.timer && this.timer.countdownStatus;
  disabledSub$ = this.timer && this.timer.disabledStatus;
  peopleList$ = this.store.select(selectPeople);
  myUid = localStorage.getItem('uid');

  constructor(
    private loadingService: LoadingService,
    private store: Store,
    private timerService: TimerService,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.peopleList$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((people) => {
      if (people.length === 0) {
        this.store.dispatch(PEOPLE_ACTIONS.getPeople());
      }
      this.cdr.markForCheck();
    });
  }

  starTimer(): void {
    this.updateList();
    this.timer && this.timer.startCountDown();
  }

  private updateList(): void {
    this.store.dispatch(PEOPLE_ACTIONS.getPeople());
  }
}
