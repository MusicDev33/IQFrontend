import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fakemain',
  templateUrl: './fakemain.component.html',
  styleUrls: ['./fakemain.component.css']
})
export class FakemainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.classList.add('bg-pic');
  }

}
