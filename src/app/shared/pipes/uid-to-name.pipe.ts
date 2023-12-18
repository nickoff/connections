import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPeopleNameByID } from 'src/app/store/people';

@Pipe({
  name: 'userIdToName',
  standalone: true
})
export class UserIdToNamePipe implements PipeTransform {
  constructor(private store: Store) {}

  transform(userId: string): Observable<string> {
    return this.store.select(selectPeopleNameByID(userId));
  }
}
