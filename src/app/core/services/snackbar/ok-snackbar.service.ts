import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class OkSnackbarService {
  constructor(private snackbar: MatSnackBar) {}
  openSnackbar(message: string): void {
    this.snackbar.open(`✔️ OK: ${message} from server successfully ✔️`, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['ok-snackbar']
    });
  }
}
