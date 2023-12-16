import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { LoadingService } from 'src/app/core/services/loading/loading.services';
import { GROUPS_ACTIONS, selectGroupByID } from 'src/app/store/groups';

@Component({
  selector: 'app-modal-delete-group',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    CommonModule,
    MatProgressBarModule
  ],
  templateUrl: './modal-delete-group.component.html',
  styleUrl: './modal-delete-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalDeleteGroupComponent {
  isLoading$ = this.loadingService.getLoading;
  constructor(
    public dialogRef: MatDialogRef<ModalDeleteGroupComponent>,
    private store: Store,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef,
    private loadingService: LoadingService
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
