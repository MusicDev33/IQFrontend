import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { IQAuthService } from '@services/backend/iqauth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: IQAuthService, private router: Router) {

  }

  canActivate() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/dashboard']);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
