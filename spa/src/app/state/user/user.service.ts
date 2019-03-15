import { Injectable } from '@angular/core';
import { UserState, userStateFactory, UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private _userStore: UserStore) {
  }

  setState(state: UserState) {
    this._userStore.update(state);
  }

  logout() {
    this._userStore.update(userStateFactory());
  }
}
