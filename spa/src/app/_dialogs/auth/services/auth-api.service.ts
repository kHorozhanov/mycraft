import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { SignInFormModel } from '../models/sign-in-form.model';

@Injectable()
export class AuthApiService {
  constructor(private _http: HttpClient) {
  }

  signIn(form: SignInFormModel): Observable<boolean> {
    return timer(1000).pipe(mapTo(true));
  }
}
