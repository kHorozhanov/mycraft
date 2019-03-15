import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthDialogConfig } from '../../_dialogs/auth/models/auth-dialog-config.model';
import { AuthDialogService } from '../../_dialogs/auth/services/auth-dialog.service';
import { UserQuery } from '../../state/user/user.query';
import { UserService } from '../../state/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isLoggedIn$ = this._userQuery.isLoggedIn$;
  user$ = this._userQuery.user$;

  constructor(
    private _userQuery: UserQuery,
    private _userService: UserService,
    private _authDialog: AuthDialogService) {
  }

  onLogin() {
    const dialogRef = this._authDialog.open(new AuthDialogConfig());
    dialogRef.afterClosed().subscribe();
  }

  onLogout() {
    this._userService.logout();
  }

}
