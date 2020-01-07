import { Component, OnInit, NgZone, isDevMode } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { toIUser } from '@interfaces/typeguards/IUserTest';

import { ValidateService } from '@services/utility/validate.service';
import { IQAuthService } from '@services/backend/iqauth.service';
import { Router } from '@angular/router';
import { DebugService } from '@services/utility/debug.service';
import { UserService } from '@services/user.service';

import { GoogleLoginProvider } from 'angularx-social-login';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  login: string;
  password: string;
  user: SocialUser;
  loggedIn = false;

  isDevMode = false;

  constructor(
    public validator: ValidateService,
    public flashMsg: FlashMessagesService,
    public authService: IQAuthService,
    public router: Router,
    public debug: DebugService,
    public ngZone: NgZone,
    public userService: UserService,
    public socialAuthService: AuthService) {
      if (isDevMode()) {
        this.isDevMode = true;
      }

    }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user: any) => {
      if (user) {
        this.user = user;
        this.loggedIn = (user != null);
        this.authService.authUserGoogle(user.id).subscribe(data => {
          const res: any = data;
          if (res.success) {
            const saveUser = toIUser(res.user);
            this.authService.storeUserData(res.token, saveUser);
            this.userService.changeUserProperty('profileImage', user.photoUrl).subscribe(results => {
              this.debug.log(results);
            });
            this.router.navigate(['/dashboard']);
          } else {
            const newUser = {
              name: user.name,
              email: user.email,
              handle: '',
              photoUrl: user.photoUrl,
              googleID: user.id
            };
            this.authService.setTempUser(newUser);
            this.authService.setTempGoogleID(user.id);
            this.router.navigate(['/gsignincb']);
          }
        });
      }
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  onLoginSubmit() {
    const user = {
      login: this.login,
      password: this.password
    };

    let response: any = {};

    // Required Fields
    if (!this.validator.validateLogin(user)) {
      this.flashMsg.show('Please fill in all fields!', {cssClass: 'alert-danger', timeout: 2000});
      return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {
      response = data;
      this.debug.log(data);
      if (response.success) {
        this.authService.storeUserData(response.token, response.user);
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMsg.show(response.msg, {cssClass: 'alert-danger', timeout: 2000});
        this.router.navigate(['/authenticate']);
      }
    });
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }
}
