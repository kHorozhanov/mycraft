import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { User } from './user.model';

export interface UserState {
  data: User;
  token: string;
}

export function userStateFactory(): UserState {
  return {
    data: null,
    token: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(userStateFactory());
  }
}
