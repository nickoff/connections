import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { LoadingService } from 'src/app/core/services/loading/loading.services';
import { GROUPS_ACTIONS, selectGroups } from 'src/app/store/groups';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule, MatIconModule],
  templateUrl: './groups-list.component.html',
  styleUrl: './groups-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsListComponent {
  isButtonDisabled = false;
  isLoading$ = this.loadingService.getLoading;
  groupsList$ = this.store.select(selectGroups);
  myUid = localStorage.getItem('uid');

  constructor(
    private loadingService: LoadingService,
    private store: Store
  ) {
    this.groupsList$.subscribe((groups) => {
      if (groups.length === 0) {
        this.store.dispatch(GROUPS_ACTIONS.getGroups());
      }
    });
  }
}
