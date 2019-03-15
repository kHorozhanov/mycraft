import { AuthDialogModes } from '../constants/auth-dialog-modes.const';
import { SignInFormModel } from './sign-in-form.model';

export class AuthDialogConfig {
  mode: AuthDialogModes;
  signInFormValue: SignInFormModel;

  constructor(config?: Partial<AuthDialogConfig>) {
    config = config || {};
    this.mode = config.mode || AuthDialogModes.SIGN_IN;
    this.signInFormValue = config.signInFormValue || new SignInFormModel();
  }
}
