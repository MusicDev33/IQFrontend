import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  onLoginClicked() {
    this.router.navigate(['/login']);
  }

}
