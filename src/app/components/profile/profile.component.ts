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
  currentUser: any = {}

  constructor(private authService: AuthService,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userHandle = this.activatedRoute.snapshot.paramMap.get('handle');
    this.currentUser = this.authService.getUserID()
    this.authService.loadUser();

    this.authService.getUserByHandle(this.userHandle).subscribe(data => {
      console.log(data)
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
