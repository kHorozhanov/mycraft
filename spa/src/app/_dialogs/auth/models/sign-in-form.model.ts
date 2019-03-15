export class SignInFormModel {
  email: string;
  password: string;

  constructor(config?: Partial<SignInFormModel>) {
    config = config || {};
    this.email = config.email || '';
    this.password = config.password || '';
  }
}
