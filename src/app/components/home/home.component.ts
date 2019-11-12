import { Component, OnInit } from '@angular/core';
import { IQAuthService } from '@services/backend/iqauth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: IQAuthService) { }

  ngOnInit() {
  }

}
