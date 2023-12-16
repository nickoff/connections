/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CreateTimer {
  countdownStatus: BehaviorSubject<number>;
  disabledStatus: BehaviorSubject<boolean>;
  startCountDown: () => void;
}

const startCountdownValue = 60;

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timers = new Map<string, CreateTimer>();

  createTimer(id: string, onComplete?: () => void): CreateTimer | undefined {
    if (this.timers.has(id)) {
      return this.timers.get(id);
    }

    let countdown = startCountdownValue;
    let isDisabled = false;
    const countdownStatus = new BehaviorSubject<number>(countdown);
    const disabledStatus = new BehaviorSubject<boolean>(isDisabled);

    function startCountDown(): void {
      isDisabled = true;
      disabledStatus.next(isDisabled);
      const intervalId = setInterval(() => {
        countdown -= 1;
        countdownStatus.next(countdown);
        if (countdown === 0) {
          clearInterval(intervalId);
          isDisabled = false;
          disabledStatus.next(isDisabled);
          countdown = startCountdownValue;
          countdownStatus.next(countdown);
          if (onComplete) onComplete();
        }
      }, 1000);
    }

    const timer = {
      countdownStatus,
      disabledStatus,
      startCountDown
    };

    this.timers.set(id, timer);

    return timer;
  }
}
