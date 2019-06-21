import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object
  userHandle: String

  // Current user is the user to whom the profile page belongs to
  // User is the user using the browser
  currentUser: any = {}

  userMatch: Boolean

  constructor(private authService: AuthService,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userMatch = false;

    this.userHandle = this.activatedRoute.snapshot.paramMap.get('handle');
    this.authService.loadUser();

    this.authService.getUserByHandle(this.userHandle).subscribe(data => {
      var res: any = {}
      res = data
      this.currentUser = res.user
      console.log(this.currentUser)
    })

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
