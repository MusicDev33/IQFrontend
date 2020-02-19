import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ISubject } from '@interfaces/schemas/ISubject';

@Component({
  selector: 'app-subjectlist',
  templateUrl: './subjectlist.component.html',
  styleUrls: ['./subjectlist.component.scss']
})
export class SubjectListComponent implements OnInit {

  @Input() subjects: ISubject[] = [];

  constructor(public router: Router) { }

  ngOnInit() {
  }

  toSubjectURL(subjectName: string) {
    // Remove extra whitespace: "quantum   physics" becomes "quantum physics"
    // Then replace those spaces with dashes: "quantum physics" then becomes "quantum-physics"
    return subjectName.trim().replace(/[ ]+/ig, '-');
  }

}
