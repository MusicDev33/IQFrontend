import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { IQAuthService } from '@services/backend/iqauth.service';

@Injectable()
export class GSigninGuard implements CanActivate {
  constructor(private authService: IQAuthService, private router: Router) {

  }

  canActivate() {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/authenticate']);
      return false;
    }
  }
}
