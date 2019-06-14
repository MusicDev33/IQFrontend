import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object
  currentUser: any = {}

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getUserID()
    this.authService.loadUser();
    this.authService.getProfile().subscribe(data => {
      var res: any = {}
      res = data
      this.user = res.user
      console.log(this.user)
    }, err => {
      console.log(err)
      return false
    })
  }
}
