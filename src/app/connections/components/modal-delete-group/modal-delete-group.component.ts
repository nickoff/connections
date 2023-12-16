import { ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GROUPS_ACTIONS, selectGroupByID } from 'src/app/store/groups';

@Component({
  selector: 'app-modal-delete-group',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './modal-delete-group.component.html',
  styleUrl: './modal-delete-group.component.scss'
})
export class ModalDeleteGroupComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDeleteGroupComponent>,
    private store: Store,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef
  ) {}

  close(): void {
    this.store.dispatch(GROUPS_ACTIONS.deleteGroup({ groupID: this.dialogRef.id }));
    this.store
      .select(selectGroupByID(this.dialogRef.id))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((group) => {
        if (!group) this.dialogRef.close();
        this.cdr.markForCheck();
      });
  }
}
