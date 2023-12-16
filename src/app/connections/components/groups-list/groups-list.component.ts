import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { LoadingService } from 'src/app/core/services/loading/loading.services';
import { TimerService } from 'src/app/core/services/timer/timer.service';
import { GROUPS_ACTIONS, selectGroups } from 'src/app/store/groups';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule, MatIconModule],
  templateUrl: './groups-list.component.html',
  styleUrl: './groups-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsListComponent implements OnInit {
  private timer = this.timerService.createTimer('groupsList', this.updateList.bind(this));
  isLoading$ = this.loadingService.getLoading;
  groupsList$ = this.store.select(selectGroups);
  countdownSub$ = this.timer && this.timer.countdownStatus;
  disabledSub$ = this.timer && this.timer.disabledStatus;
  myUid = localStorage.getItem('uid');

  constructor(
    private loadingService: LoadingService,
    private store: Store,
    private timerService: TimerService
  ) {}
  ngOnInit(): void {
    this.groupsList$.subscribe((groups) => {
      if (groups.length === 0) {
        this.store.dispatch(GROUPS_ACTIONS.getGroups());
      }
    });
  }

  starTimer(): void {
    this.timer && this.timer.startCountDown();
  }

  private updateList(): void {
    this.store.dispatch(GROUPS_ACTIONS.getGroups());
  }
}
