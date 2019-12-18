import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iqjobs',
  templateUrl: './iqjobs.component.html',
  styleUrls: ['./iqjobs.component.scss']
})
export class IQJobsComponent implements OnInit {

  jobsList: Array<string>;
  jobIndex = 0;
  fullNameField = '';

  constructor() { }

  ngOnInit() {
    this.jobsList = ['Content Management Agent'];
  }

  increaseJobIndex() {
    if (this.jobIndex >= this.jobsList.length - 1) {
      this.jobIndex = this.jobsList.length - 1;
    } else {
      this.jobIndex += 1;
    }
  }

  decreaseJobIndex() {
    console.log("hi")
    if (this.jobIndex <= 0) {
      this.jobIndex = 0;
    } else {
      this.jobIndex -= 1;
    }
  }

  clickedOnApply() {
    
  }
}
