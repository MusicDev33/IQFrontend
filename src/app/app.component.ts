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
  isHomePage = false;

  constructor(public activatedRoute: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {
     this.router.events.subscribe(this.onUrlChange.bind(this));
  }

  onUrlChange(ev) {
    if (ev instanceof NavigationEnd) {
      const url = ev.url;
      this.currentRoute = url;
      if (url === '/') {
        this.showNavBar = false;
        this.isHomePage = true;
      } else if (url === '/register' || url === '/authenticate') {
        this.showNavBar = false;
        this.isHomePage = false;
      } else {
        this.showNavBar = true;
        this.isHomePage = false;
      }
    }
  }
}
