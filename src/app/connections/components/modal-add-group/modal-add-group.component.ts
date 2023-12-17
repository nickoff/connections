import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
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

import { ERROR_NAME_GROUP_MESSAGE } from '../../constants';
import { GroupNameErrors } from '../../enums';
import { validateGroupName } from '../../services/validate-group.service';

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
export class ModalAddGroupComponent implements OnInit {
  isLoading$ = this.loadingService.getLoading;
  isButtonDisabled = true;
  isSubmitted = false;

  newGroupForm: FormGroup<NewGroupFormModel> = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, validateGroupName()] })
  });

  name = this.newGroupForm.controls.name;

  isShowNameError = false;
  nameErrors?: string;

  constructor(
    public dialogRef: MatDialogRef<ModalAddGroupComponent>,
    private store: Store,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.newGroupForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.refreshErrorsState();
      this.newGroupForm.valid ? (this.isButtonDisabled = false) : (this.isButtonDisabled = true);
      this.cdr.markForCheck();
    });
  }

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

  private refreshErrorsState(): void {
    this.isShowNameError = this.getShowNameError();
    this.nameErrors = this.getNameErrors();
  }

  private getShowNameError(): boolean {
    return this.name.errors !== null && this.name.errors && (this.name.dirty || this.isSubmitted);
  }

  private getNameErrors(): string {
    return (
      this.name.errors !== null &&
      ((this.name.errors[GroupNameErrors.onlyLettersOrDigitsOrSpaces] &&
        ERROR_NAME_GROUP_MESSAGE.onlyLettersOrDigitsOrSpaces) ||
        (this.name.errors[GroupNameErrors.required] && ERROR_NAME_GROUP_MESSAGE.required) ||
        (this.name.errors[GroupNameErrors.maxLengthName] && ERROR_NAME_GROUP_MESSAGE.maxLengthName))
    );
  }
}
