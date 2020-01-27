import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionService } from '@services/question.service';

import { IQuestion } from '@interfaces/schemas/IQuestion';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  currentSplice = 0;

  topQuestions: IQuestion[] = [];

  constructor(
    public router: Router,
    public questionService: QuestionService
  ) { }

  ngOnInit() {
    this.questionService.getTrendingQuestions().subscribe((questionData: any) => {
      if (questionData.success) {
        this.topQuestions = questionData.questions;
      }
    });
  }

  onLoginClicked() {
    this.router.navigate(['/login']);
  }

  signInWithGoogle() {
    // stuff
  }

  topQuestionSlice(slice: number) {
    return [this.topQuestions[slice], this.topQuestions[slice + 1]];
  }
}
