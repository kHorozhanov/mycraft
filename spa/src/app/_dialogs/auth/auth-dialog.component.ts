import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getUserMock } from '../../state/user/user.model';
import { UserService } from '../../state/user/user.service';
import { AuthDialogModes } from './constants/auth-dialog-modes.const';
import { AuthDialogConfig } from './models/auth-dialog-config.model';
import { SignInFormModel } from './models/sign-in-form.model';
import { AuthApiService } from './services/auth-api.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthDialogComponent implements OnDestroy {
  private _destroyed = new Subject<boolean>();
  authDialogModes = AuthDialogModes;
  loading: boolean;
  isSuccess: boolean;
  error: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public config: AuthDialogConfig,
    private _changeDetectorRef: ChangeDetectorRef,
    private _authApiService: AuthApiService,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<AuthDialogComponent>,
  ) {
  }

  ngOnDestroy() {
    this._destroyed.next(true);
    this._destroyed.complete();
  }

  onSignIn(form: SignInFormModel) {
    this.loading = true;
    this._authApiService.signIn(form)
      .pipe(takeUntil(this._destroyed))
      .subscribe(
        () => {
          this.loading = false;
          this.isSuccess = true;
          this._userService.setState({ data: getUserMock(), token: 'cdscdscdsc' });
          this._dialogRef.close();
        },
        () => {
          this.loading = false;
          this.error = true;
          this._changeDetectorRef.detectChanges();
        },
      );
  }
}
