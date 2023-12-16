import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading/loading.services';
import { TimerService } from 'src/app/core/services/timer/timer.service';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleListComponent {
  private timer = this.timerService.createTimer('peopleList');
  isLoading$ = this.loadingService.getLoading;
  countdownSub$ = this.timer && this.timer.countdownStatus;
  disabledSub$ = this.timer && this.timer.disabledStatus;

  constructor(
    private timerService: TimerService,
    private loadingService: LoadingService
  ) {}

  starTimer(): void {
    this.timer && this.timer.startCountDown();
  }
}
