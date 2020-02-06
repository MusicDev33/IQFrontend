import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ISubject } from '@interfaces/schemas/ISubject';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  @Input() subjects: ISubject[] = [];
  @Input() userSubjects: ISubject[] = [];

  @Output() sendFollow = new EventEmitter<ISubject>();
  @Output() sendUnfollow = new EventEmitter<ISubject>();

  subjectIndex = 0;

  constructor() { }

  ngOnInit() {
  }

  leftArrowClicked() {
    if (this.subjectIndex > 0) {
      this.subjectIndex -= 1;
    }
  }

  rightArrowClicked() {
    if (this.subjectIndex < this.subjects.length - 1) {
      this.subjectIndex += 1;
    }
  }

  unfollowButtonClicked(subject: ISubject) {
    this.sendUnfollow.emit(subject);
  }

  followButtonClicked(subject: ISubject) {
    this.sendFollow.emit(subject);
  }
}
