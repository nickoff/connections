import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { GROUPS_ACTIONS, selectGroups } from 'src/app/store/groups';

export interface NewGroupFormModel {
  name: FormControl<string>;
}

@Component({
  selector: 'app-modal-add-group',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    CommonModule,
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './modal-add-group.component.html',
  styleUrl: './modal-add-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalAddGroupComponent {
  isLoading$ = this.loadingService.getLoading;

  newGroupForm: FormGroup<NewGroupFormModel> = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  constructor(
    public dialogRef: MatDialogRef<ModalAddGroupComponent>,
    private store: Store,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef,
    private loadingService: LoadingService
  ) {}

  addGroup(): void {
    if (!this.newGroupForm.value.name || !this.newGroupForm.valid) return;
    this.store.dispatch(GROUPS_ACTIONS.createGroup({ newGroupName: this.newGroupForm.value.name }));
    this.store
      .select(selectGroups)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((group) => {
        if (group && group.length > 0) this.dialogRef.close();
        this.cdr.markForCheck();
      });
  }
}
