import { Component, OnInit, NgZone } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DebugService } from '../../services/debug.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  email: String;
  password: String;

  constructor(
    public validator: ValidateService,
    public flashMsg: FlashMessagesService,
    public authService: AuthService,
    public router: Router,
    public debug: DebugService,
    public ngZone: NgZone) {
      window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
    }

  ngOnInit() {
  }

  onSignIn(user) {
    console.log(user);
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

    let response: any = {}

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
        this.flashMsg.show('Logged in!', {cssClass: 'alert-success', timeout: 2000});
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMsg.show(response.msg, {cssClass: 'alert-danger', timeout: 2000});
        this.router.navigate(['/authenticate']);
      }
    });
  }
}
