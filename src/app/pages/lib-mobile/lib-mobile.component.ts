import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IQAuthService } from '@services/backend/iqauth.service';
import { UserService } from '@services/user.service';
import { DebugService } from '@services/utility/debug.service';
import { SourceService } from '@services/source.service';
import { SearchService } from '@services/search.service';
import { QuestionService } from '@services/question.service';

import { User } from '@classes/user';
import { ISource } from '@interfaces/schemas/ISource';
import { IQuestion } from '@interfaces/schemas/IQuestion';

enum ContentMode {
  Sources,
  Tags,
  Questions
}

@Component({
  selector: 'app-lib-mobile',
  templateUrl: './lib-mobile.component.html',
  styleUrls: ['./lib-mobile.component.scss']
})
export class LibMobileComponent implements OnInit {

  user: User;

  defaultSourceName = 'No Source Selected';
  currentSourceName = this.defaultSourceName;
  currentSource: ISource;

  currentMode = ContentMode.Questions;

  sourceQuestions: IQuestion[];
  filteredQuestions: IQuestion[];

  constructor(
    public authService: IQAuthService,
    public userService: UserService,
    public debug: DebugService,
    public sourceService: SourceService,
    public search: SearchService,
    public qService: QuestionService,
    public router: Router
  ) { }

  ngOnInit() {
    this.userService.getProfile().subscribe(data => {
      const res: any = data;
      this.user = Object.assign(new User(), res.user);
      if (this.user.currentSources.length) {
        this.openSource(this.user.currentSources[0]);
      }
      if (localStorage.getItem('lib-key')) {
        this.openSource(localStorage.getItem('lib-key'));
        localStorage.removeItem('lib-key');
      }
    });
  }

  get contentMode() { return ContentMode; }

  openSource(sourceName: string) {
    this.currentSourceName = sourceName;

    this.sourceService.getSourceByName(sourceName).subscribe(data => {
      const res: any = data;
      this.currentSource = res.source;
      this.sourceService.getQuestionsFromSource(res.source._id).subscribe((sourceResults: any) => {
        this.sourceQuestions = sourceResults.questions;
      });
    });
  }
}
