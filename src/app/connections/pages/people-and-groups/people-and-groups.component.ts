import { ChangeDetectionStrategy, Component } from '@angular/core';

import { GroupsListComponent, PeopleListComponent } from '../../components/index';

@Component({
  selector: 'app-people-and-groups',
  standalone: true,
  imports: [GroupsListComponent, PeopleListComponent],
  templateUrl: './people-and-groups.component.html',
  styleUrl: './people-and-groups.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleAndGroupsComponent {}
