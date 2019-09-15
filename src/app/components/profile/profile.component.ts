import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { QuestionService } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SearchpopupComponent } from '../searchpopup/searchpopup.component';
import { DebugService } from '../../services/debug.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { SearchService } from '../../services/search.service';


enum ContentView {
  answers,
  questions,
  knowledge
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: object;
  userHandle: string;

  // Current user is the user to whom the profile page belongs to
  // User is the user using the browser
  currentUser: any = {};

  userMatch: boolean;
  view: ContentView;

  userQuestions: Array<object>;
  userAnswers: Array<object>;

  knowledgeText = '';
  subjectSearchResults = [];

  addKnowledgeEnabled = false;
  selectedSubjectURL = '';
  selectedSubjectName = '';

  constructor(
    public authService: AuthService,
    public activatedRoute: ActivatedRoute,
    public qService: QuestionService,
    public router: Router,
    public ansService: AnswerService,
    public dialog: MatDialog,
    public debug: DebugService,
    public search: SearchService) { }

  ngOnInit() {
    // Enum hax
    this.view = ContentView.knowledge;


    this.userMatch = false;

    this.userHandle = this.activatedRoute.snapshot.paramMap.get('handle');

    this.authService.getUserByHandle(this.userHandle).subscribe(data => {
      let res: any = {}
      res = data;
      this.currentUser = res.user;
      this.debug.log(res);

      this.qService.getUserQuestions('' + this.currentUser._id).subscribe(data => {
        let res: any = {}
        res = data;
        this.debug.log(res);
        this.userQuestions = res.questions;
        this.debug.log(this.userQuestions);
      });

      this.ansService.getUserAnswers('' + this.currentUser._id).subscribe(data => {
        let res: any = {};
        res = data;
        this.debug.log(res);
        this.userAnswers = res.answers;
        this.debug.log(this.userAnswers);
      });
    });
    if (this.authService.hasToken()) {
      this.authService.getProfile().subscribe(data => {
        let res: any = {}
        res = data;
        this.user = res.user;
        this.debug.log(this.user);
      }, err => {
        this.debug.log(err);
        return false;
      });
    }
  }

  // This is how we will get our enums...kinda hacky
  get contentView() { return ContentView }

  onAnswersClick() {
    this.debug.log('Answers');
    if (this.view !== ContentView.answers) {
      this.view = ContentView.answers;
    }
  }

  onQuestionsClick() {
    this.debug.log('Questions');
    if (this.view !== ContentView.questions) {
      this.view = ContentView.questions;
    }
  }

  onKnowledgeClick() {
    this.debug.log('Questions');
    if (this.view !== ContentView.knowledge) {
      this.view = ContentView.knowledge;
    }
  }

  // Not to be confused with onQuestionsClick
  onQuestionClicked(text) {
    const questionURL = this.qService.questionTextToURL(text);
    this.debug.log(questionURL);
    const routeURL = '/question/' + questionURL;
    this.router.navigate([routeURL]);
  }

  editBio() {

  }

  subjectKeyup() {
    const minLength = 1;
    if (this.knowledgeText.length > minLength && this.subjectSearchResults.length === 0) {
      this.search.subjectSearch(this.knowledgeText).subscribe(data => {
        const res: any = data;
        this.subjectSearchResults = res.subjects;
      });
    } else if (this.knowledgeText.length <= minLength) {
      this.subjectSearchResults = [];
    }
  }

  subjectSelected(subject) {
    this.selectedSubjectURL = subject.item.subjectURL;
    this.selectedSubjectName = subject.item.name;
    this.addKnowledgeEnabled = true;
    this.knowledgeText = '';
  }

  addKnowledge() {
    this.authService.addKnowledge(this.selectedSubjectURL).subscribe(data => {
      const res: any = data;
      this.debug.log(res);
      this.selectedSubjectURL = '';
      this.selectedSubjectName = '';
      this.addKnowledgeEnabled = false;
    });
  }

deleteKnowledge() {
    this.authService.deleteKnowledge(this.selectedSubjectURL).subscribe(data => {
      const res: any = data;
      this.debug.log(res);
    });
  }

  disableKnowledge() {
    this.addKnowledgeEnabled = false;
  }
}
