import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  firstName: String;
  lastName: String;
  email: String;
  password: String;

  response: any = {}

  constructor(
    private validator: ValidateService,
    private flashMsg: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }

    // Required Fields
    if(!this.validator.validateRegister(user)){
      this.flashMsg.show("Please fill in all fields!", {cssClass: 'alert-danger', timeout: 2000})
      return false;
    }

    // Register service
    this.authService.registerUser(user).subscribe(data => {
      console.log(data)

      this.response = data

      if(this.response.success){
        this.flashMsg.show("You're now registered!", {cssClass: 'alert-success', timeout: 2000})
        this.router.navigate(['/authenticate'])
      }else{
        this.flashMsg.show("Something went wrong.", {cssClass: 'alert-danger', timeout: 2000})
        this.router.navigate(['/register'])
      }
    })
  }

}
