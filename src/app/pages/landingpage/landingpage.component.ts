import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { QuestionService } from '@services/question.service';
import { SearchService } from '@services/search.service';

import { IQuestion } from '@interfaces/schemas/IQuestion';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  currentSplice = 0;

  topQuestions: IQuestion[] = [];
  searchDataSource: Observable<IQuestion>;

  searchText = '';

  constructor(
    public router: Router,
    public questionService: QuestionService,
    public searchService: SearchService
  ) {
    this.searchDataSource = Observable.create((observer: any) => {
      observer.next(this.searchText);
    }).mergeMap((token: string) => {
      return this.searchService.questionSearch(token);
    });
  }

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

  // search
  onSearchKeyUp(): void {
    // implement
  }

  searchNoResults(noResults: boolean): void {
    // implement
  }

  searchResultSelected(selectedObject: IQuestion): void {
    // DO
  }
}
