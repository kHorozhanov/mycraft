import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthDialogComponent } from '../auth-dialog.component';
import { AuthDialogConfig } from '../models/auth-dialog-config.model';

@Injectable()
export class AuthDialogService {
  constructor(private _matDialog: MatDialog) {
  }

  open(config = new AuthDialogConfig()): MatDialogRef<AuthDialogComponent> {
    return this._matDialog.open(AuthDialogComponent, {
      autoFocus: false,
      data: config,
    });
  }
}
