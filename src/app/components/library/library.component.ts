import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IQAuthService } from '@services/backend/iqauth.service';
import { UserService } from '@services/user.service';
import { DebugService } from '@services/utility/debug.service';
import { SourceService } from '@services/source.service';
import { SearchService } from '@services/search.service';
import { QuestionService } from '@services/question.service';

import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  user: any;

  findSourceMode = false;
  findSourceText = '';
  sourceSearchResults = [];

  selectedSource = '';
  selectedSourceID = '';

  // A result of poor planning
  openedSource = '';
  openedSourceObject: any = {};

  questions = [];
  // Questions that are currently visible
  currentQuestions = [];

  addTagMode = false;
  tagText = '';
  selectedTag = '';

  constructor(
    public authService: IQAuthService,
    public userService: UserService,
    public debug: DebugService,
    public sourceService: SourceService,
    public search: SearchService,
    public qService: QuestionService,
    public router: Router) { }

  ngOnInit() {
    this.userService.getProfile().subscribe(data => {
      const res: any = data;
      this.user = res.user;
    });
  }

  findSource() {
    this.findSourceMode = true;
    this.debug.log(this.findSourceMode);
  }

  findSourceKeyUp() {
    const minLength = 1;
    if (this.findSourceText.length > minLength && this.sourceSearchResults.length === 0) {
      this.search.sourceSearch(this.findSourceText).subscribe(data => {
        const res: any = data;
        this.sourceSearchResults = res.sources.filter(filterSource => {
          return !this.user.currentSources.includes(filterSource);
        });
      });
    } else if (this.findSourceText.length <= minLength) {
      this.sourceSearchResults = [];
    }
  }

  sourceSelected(source: any) {
    this.selectedSource = source.item.name;
    this.selectedSourceID = source.item._id;
  }

  addSourceToUser() {
    this.userService.addSourceToUser(this.selectedSource).subscribe(data => {
      this.debug.log(data);
    });
    this.findSourceText = '';
    this.selectedSource = '';
    this.selectedSourceID = '';
  }

  removeSourceFromUser(sourceName: string) {
    this.userService.removeSourceFromUser(sourceName).subscribe(data => {
      this.debug.log(data);
    });
  }

  openSource(sourceName: string) {
    this.selectedTag = '';
    this.openedSource = sourceName;
    this.sourceService.getQuestionsFromSourceByName(sourceName).subscribe(data => {
      this.debug.log(data);
      const res: any = data;
      this.questions = res.questions;
      this.currentQuestions = this.questions;
    });

    this.sourceService.getSourceByName(sourceName).subscribe(data => {
      const res: any = data;
      this.openedSourceObject = res.source;
      this.debug.log(this.openedSourceObject.tags);
    });
  }

  questionClicked(text: string) {
    const questionURL = this.qService.questionTextToURL(text);
    this.debug.log(questionURL);
    const routeURL = '/question/' + questionURL;
    this.router.navigate([routeURL]);
  }

  addTagToSource() {
    this.sourceService.addTag(this.tagText, this.openedSourceObject._id).subscribe(data => {
      const res: any = data;
      this.openedSourceObject = res.source;
    });
    this.tagText = '';
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
    this.currentQuestions = this.questions.filter(question => {
      return question.tags.includes(this.selectedTag);
    });
  }
}
