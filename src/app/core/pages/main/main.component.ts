import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GroupsListComponent } from 'src/app/connections/components/groups-list/groups-list.component';

import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, GroupsListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {}
