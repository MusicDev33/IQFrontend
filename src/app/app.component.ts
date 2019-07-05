import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-src';
  currentRoute = ""
  isHomePage = false

  constructor(public activatedRoute: ActivatedRoute, public router: Router){

  }

  ngOnInit(){
     this.router.events.subscribe(this.onUrlChange.bind(this))
  }

  onUrlChange(ev) {
    if(ev instanceof NavigationEnd) {
      let url = ev.url;
      this.currentRoute = url
      if (url === "/"){
        this.isHomePage = true
      }else{
        this.isHomePage = false
      }
      console.log(this.isHomePage)
      console.log(this.activatedRoute.outlet)
    }
  }
}
