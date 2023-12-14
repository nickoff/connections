import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading/loading.services';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './groups-list.component.html',
  styleUrl: './groups-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsListComponent {
  isButtonDisabled = false;
  isLoading$ = this.loadingService.getLoading;

  constructor(private loadingService: LoadingService) {}
}
