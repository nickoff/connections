import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  setLoading(isLoading: boolean): void {
    this.loading.next(isLoading);
  }
}
