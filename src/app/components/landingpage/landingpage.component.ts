import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IQuestion } from '@interfaces/schemas/IQuestion';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  question: IQuestion = {
    _id: '5e1892a2d5f7587d4125d9b0',
    askerID: '5e189210d5f7587d4125d9af',
    type: 'question',
    questionText: 'What is a Lewis acid?',
    urlText: 'What-is-a-Lewis-acid',
    subject: 'Chemistry',
    views: 1,
    votes: 1,
    askerHandle: 'shelby',
    asker: 'Shelby McCowen',
    answerNum: 0,
    tags: [''],
    homeworkSource: [''],
    details: '',
    time: ''
  };

  constructor(public router: Router) { }

  ngOnInit() {
  }

  onLoginClicked() {
    this.router.navigate(['/login']);
  }

  signInWithGoogle() {
    // stuff
  }
}
