import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { storageRead, storageSave } from '../util/storage.utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  get user(): User | undefined {
    return this._user;
  }
  set user(user:User | undefined) {
    this._user = user;
    storageSave<User>("user",user!);
  }
  private _user?: User;
  constructor() { 
    this._user = storageRead<User>("user")
  }
}
