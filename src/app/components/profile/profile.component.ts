import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { QuestionService } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SearchpopupComponent } from '../searchpopup/searchpopup.component';
import { DebugService } from '../../services/debug.service';


enum ContentView {
  answers,
  questions
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Object;
  userHandle: String;

  // Current user is the user to whom the profile page belongs to
  // User is the user using the browser
  currentUser: any = {};

  userMatch: Boolean;
  view: ContentView

  userQuestions: Array<Object>;
  userAnswers: Array<Object>;

  constructor(
    public authService: AuthService,
    public activatedRoute: ActivatedRoute,
    public qService: QuestionService,
    public router: Router,
    public ansService: AnswerService,
    public dialog: MatDialog,
    public debug: DebugService) { }

  ngOnInit() {
    // Enum hax
    this.view = ContentView.questions;


    this.userMatch = false;

    this.userHandle = this.activatedRoute.snapshot.paramMap.get('handle');

    this.authService.getUserByHandle(this.userHandle).subscribe(data => {
      var res: any = {}
      res = data;
      this.currentUser = res.user;
      this.debug.log(res);

      this.qService.getUserQuestions('' + this.currentUser._id).subscribe(data => {
        var res: any = {}
        res = data;
        this.debug.log(res);
        this.userQuestions = res.questions;
        this.debug.log(this.userQuestions);
      });

      this.ansService.getUserAnswers('' + this.currentUser._id).subscribe(data => {
        var res: any = {};
        res = data;
        this.debug.log(res);
        this.userAnswers = res.answers;
        this.debug.log(this.userAnswers);
      });
    });
    if (this.authService.hasToken()) {
      this.authService.getProfile().subscribe(data => {
        var res: any = {}
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

  // Not to be confused with onQuestionsClick
  onQuestionClicked(text) {
    const questionURL = this.qService.questionTextToURL(text);
    this.debug.log(questionURL);
    const routeURL = '/question/' + questionURL;
    this.router.navigate([routeURL]);
  }

  editBio() {

  }
}
