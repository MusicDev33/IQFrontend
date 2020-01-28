import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ang-src';
  currentRoute = '';
  showNavBar = false;
  showLandingNav = false;

  noNavbarUrls = ['/', '/register', '/login', '/authenticate', '/gsignincb'];

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public swUpdate: SwUpdate
  ) {

  }

  ngOnInit() {
     this.router.events.subscribe(this.onUrlChange.bind(this));
     if (this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe(() => {
          if (confirm('New version of Inquantir available. Load new version?')) {
              window.location.reload();
          }
        });
    }
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

      if (url === '/landing') {
        this.showNavBar = false;
        this.showLandingNav = true;
      } else {
        this.showLandingNav = false;
      }
    }
  }
}
