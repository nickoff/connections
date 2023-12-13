import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class OkSnackbarService {
  constructor(private snackbar: MatSnackBar) {}
  openSnackbar(message: string): void {
    this.snackbar.open(`✔️ OK: Load ${message} from server successfully ✔️`, '', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['ok-snackbar']
    });
  }
}
