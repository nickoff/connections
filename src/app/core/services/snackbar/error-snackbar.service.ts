import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorSnackbarService {
  constructor(private snackbar: MatSnackBar) {}
  openSnackbar(message: string): void {
    this.snackbar.open(`⚠️ ERROR: ${message || 'Server call failed'} ⚠️`, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
