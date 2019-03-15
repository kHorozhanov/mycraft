import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInFormModel } from '../models/sign-in-form.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  @Input() loading: boolean;
  @Input() initialValue: SignInFormModel;
  @Output() signIn = new EventEmitter<SignInFormModel>();
  form: FormGroup;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit() {
    const initialValue = this.initialValue || new SignInFormModel();
    this.form = this._fb.group({
      email: [initialValue.email, [Validators.email, Validators.required]],
      password: [initialValue.password, [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return false;
    }

    this.signIn.emit(this.form.value);
  }
}
