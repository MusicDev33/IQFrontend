import { Injectable, isDevMode } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class ProductionGuard implements CanActivate {
  constructor(private router: Router) {

  }

  canActivate() {
    if (isDevMode()) {
      return true;
    } else {
      this.router.navigate(['/404']);
      return false;
    }
  }
}
