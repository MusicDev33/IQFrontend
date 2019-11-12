import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { QuestionService } from '@services/question.service';
import { AnswerService } from '@services/answer.service';
import { DebugService } from '@services/utility/debug.service';
import { SearchService } from '@services/search.service';

enum ContentView {
  answers,
  questions,
  knowledge
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: object;
  userResponse: any;
  userHandle: string;

  // Current user is the user to whom the profile page belongs to
  // User is the user using the browser
  currentUser: any = {};

  userMatch: boolean;
  view: ContentView;

  userQuestions: Array<object>;
  userAnswers: Array<object>;
  knowledgeArray: Array<object>;

  knowledgeText = '';
  subjectSearchResults = [];

  addKnowledgeEnabled = false;
  selectedSubjectURL = '';
  selectedSubjectName = '';

  bioText = '';
  bioMode = false;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public activatedRoute: ActivatedRoute,
    public qService: QuestionService,
    public router: Router,
    public ansService: AnswerService,
    public dialog: MatDialog,
    public debug: DebugService,
    public search: SearchService) { }

  ngOnInit() {
    this.setUpComponent();

    this.activatedRoute.url.subscribe(url => {
       this.setUpComponent();
    });
  }

  setUpComponent() {
    // Enum hax
    this.view = ContentView.knowledge;
    this.knowledgeArray = [];


    this.userMatch = false;

    this.userHandle = this.activatedRoute.snapshot.paramMap.get('handle');

    this.userService.getUserByHandle(this.userHandle).subscribe(userData => {
      let userResponse: any = {};
      userResponse = userData;
      this.currentUser = userResponse.user;
      this.userResponse = userResponse;
      this.debug.log(userResponse);

      if (this.currentUser.knowledge) {
        for (const knowledgeIndex of Object.keys(this.currentUser.knowledge)) {
          const knowledgeObject = {};
          knowledgeObject['index'] = knowledgeIndex;
          knowledgeObject['subject'] = this.currentUser.knowledge[knowledgeIndex];
          this.knowledgeArray.push(knowledgeObject);
        }
      }

      this.qService.getUserQuestions('' + this.currentUser._id).subscribe(questionData => {
        let qResponse: any = {};
        qResponse = questionData;
        this.debug.log(qResponse);
        this.userQuestions = qResponse.questions;
        this.debug.log(this.userQuestions);
      });

      this.ansService.getUserAnswers('' + this.currentUser._id).subscribe(answerData => {
        let answerResponse: any = {};
        answerResponse = answerData;
        this.debug.log(answerResponse);
        this.userAnswers = answerResponse.answers;
        this.debug.log(this.userAnswers);
      });
    });
    if (this.authService.hasToken()) {
      this.userService.getProfile().subscribe(userData => {
        let userResponse: any = {};
        userResponse = userData;
        this.user = userResponse.user;
        this.debug.log(this.user);
      }, err => {
        this.debug.log(err);
        return false;
      });
    }
  }

  // This is how we will get our enums...kinda hacky
  get contentView() { return ContentView; }

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
    this.bioMode = true;
    if (this.currentUser.bio) {
      this.bioText = this.currentUser.bio;
    }
  }

  sendBio() {
    this.bioMode = false;
    this.currentUser['bio'] = this.bioText;
    this.userService.changeBio(this.bioText).subscribe(data => {
      const res: any = data;
      this.debug.log(res);
    });
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
    this.userService.addKnowledge(this.selectedSubjectURL).subscribe(data => {
      const res: any = data;
      this.debug.log(res);
      this.selectedSubjectURL = '';
      this.selectedSubjectName = '';
      this.addKnowledgeEnabled = false;
    });
  }

  deleteKnowledge() {
    this.userService.deleteKnowledge(this.selectedSubjectURL).subscribe(data => {
      const res: any = data;
      this.debug.log(res);
    });
  }

  disableKnowledge() {
    this.addKnowledgeEnabled = false;
  }
}
