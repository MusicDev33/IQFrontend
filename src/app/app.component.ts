import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ang-src';
  currentRoute = '';
  showNavBar = false;

  noNavbarUrls = ['/', '/register', '/login', '/authenticate', '/gsignincb'];

  constructor(public activatedRoute: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {
     this.router.events.subscribe(this.onUrlChange.bind(this));
  }

  onUrlChange(ev) {
    if (ev instanceof NavigationEnd) {
      const url = ev.url;
      this.currentRoute = url;
      if (this.noNavbarUrls.indexOf(url) >= 0) {
        this.showNavBar = false;
      } else {
        this.showNavBar = true;
      }
    }
  }
}
