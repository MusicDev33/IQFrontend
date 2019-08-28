import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.firstName === undefined || user.email === undefined || user.password === undefined || user.lastName === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateLogin(user) {
    if (user.email === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
  }
}
