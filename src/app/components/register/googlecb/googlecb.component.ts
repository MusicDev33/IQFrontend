import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQAuthService } from '@services/backend/iqauth.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-googlecb',
  templateUrl: './googlecb.component.html',
  styleUrls: ['./googlecb.component.scss']
})
export class GoogleCBComponent implements OnInit {

  usernameText = '';
  showErrorText = false;

  constructor(
    public authService: IQAuthService,
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  submitForm() {
    this.userService.getIfHandleTaken(this.usernameText).subscribe(data => {
      const res: any = data;
      if (res.userIsTaken) {
        this.showErrorText = true;
      } else {
        this.authService.setTempUserHandle(this.usernameText);
        this.authService.registerUserWithGoogle(this.authService.getTempUser()).subscribe(savedUserData => {
          const response: any = savedUserData;
          if (response.success) {
            this.authService.deleteTempGoogleID();
            this.authService.deleteTempUser();
          }
          this.router.navigate(['/login']);
        });
      }
    });
  }

  inputOnKeydown(event) {
    this.showErrorText = false;
  }
}
