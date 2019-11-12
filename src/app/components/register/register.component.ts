import { Component, OnInit, NgZone } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { ValidateService } from '@services/utility/validate.service';
import { DebugService } from '@services/utility/debug.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  handle: string;

  response: any = {};

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

  onRegisterSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      handle: this.handle
    };

    // Required Fields
    if (!this.validator.validateRegister(user)) {
      this.flashMsg.show('Please fill in all fields!', {cssClass: 'alert-danger', timeout: 2000});
      return false;
    }

    // Register service
    this.authService.registerUser(user).subscribe(data => {
      this.debug.log(data);

      this.response = data;

      if (this.response.success) {
        this.flashMsg.show('You\'re now registered!', {cssClass: 'alert-success', timeout: 2000});
        this.router.navigate(['/authenticate']);
      } else {
        this.flashMsg.show(this.response.msg, {cssClass: 'alert-danger', timeout: 2000});
        this.router.navigate(['/register']);
      }
    });
  }

}
