import { Component, OnInit, HostListener } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { SubjectsService } from '../../services/subjects.service';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { DebugService } from '../../services/debug.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;
  questions: Array<object>;
  subjects: Array<string>;
  subject: string;

  arrayOfSubjects: Array<string>;
  subjectOffset = 0;

  screenHeight: any;
  screenWidth: any;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public router: Router,
    public qService: QuestionService,
    public activatedRoute: ActivatedRoute,
    public debug: DebugService,
    public subjectsService: SubjectsService) {
      this.getScreenSize();
    }

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get('subject')) {
      this.subject = this.activatedRoute.snapshot.paramMap.get('subject');
      this.qService.getSubjectQuestions(this.subject).subscribe(data => {
        let res: any = {};
        res = data;
        this.debug.log(res);
        this.questions = res.questions;
      }, err => {
        this.debug.log(err);
        return false;
      });
    } else {
      this.subject = '';
      this.userService.getFeed().subscribe(data => {
        let res: any = {};
        res = data;
        this.debug.log(res);
        this.questions = res.feed;
      }, err => {
        this.debug.log(err);
        return false;
      });
    }

    let response: any = {};
    this.userService.getProfile().subscribe(data => {
      response = data;
      this.user = response.user;
      this.subjects = this.user.currentSubjects;
      this.debug.log(this.user);
    }, err => {
      this.debug.log(err);
      return false;
    });

    this.subjectsService.getAllSubjects().subscribe(data => {
      let response: any = {};
      response = data;
      this.arrayOfSubjects = response.subjects;
    });
  }

  subjectClicked(subject: string) {
    let subjectURL = '';
    if (!this.activatedRoute.snapshot.paramMap.get('subject')) {
      subjectURL = '/dashboard/' + subject;
      this.router.navigate([subjectURL]);
    } else {
      this.subject = subject;
      subjectURL = '/dashboard/' + subject;
      this.router.navigate([subjectURL]);
      this.qService.getSubjectQuestions(subject).subscribe(data => {
        let res: any = {};
        res = data;
        this.debug.log(res);
        this.questions = res.questions;
      }, err => {
        this.debug.log(err);
        return false;
      });
    }
  }

  questionClicked(text) {
    const questionURL = this.qService.questionTextToURL(text);
    this.debug.log(questionURL);
    const routeURL = '/question/' + questionURL;
    this.router.navigate([routeURL]);
  }

  followButtonClicked(subject) {
    this.userService.followSubject(subject.subjectURL).subscribe(data => {
      this.subjects.push(subject.name);
    });
  }

  leftArrowClicked() {
    if (this.subjectOffset > 0) {
      this.subjectOffset -= 1;
    }
  }

  rightArrowClicked() {
    if (this.subjectOffset < this.calcMaxOffset() - 1) {
      this.subjectOffset += 1;
    }
  }

  calcMaxOffset() {
    const screen = this.returnScreenBreakpoint();

    switch (screen) {
      case 'xs':
        return Math.ceil(this.arrayOfSubjects.length / 1);
      case 'sm':
        return Math.ceil(this.arrayOfSubjects.length / 2);
      case 'md':
        return Math.ceil(this.arrayOfSubjects.length / 3);
      case 'lg':
        return Math.ceil(this.arrayOfSubjects.length / 4);
      case 'xl':
        return Math.ceil(this.arrayOfSubjects.length / 4);
    }
  }

  nSubjects(n) {
    const end = this.arrayOfSubjects.length;
    if (this.arrayOfSubjects.length - (this.subjectOffset * n) < n) {
      return this.arrayOfSubjects.slice(this.subjectOffset * n, end);
    } else {
      return this.arrayOfSubjects.slice(this.subjectOffset * n, (this.subjectOffset * n) + n);
    }
  }

  returnScreenBreakpoint() {
    if (this.screenWidth < 576) {
      return 'xs';
    } else if (this.screenWidth >= 576 && this.screenWidth < 768) {
      return 'sm';
    } else if (this.screenWidth >= 768 && this.screenWidth < 992) {
      return 'md';
    } else if (this.screenWidth >= 992 && this.screenWidth < 1200) {
      return 'lg';
    } else {
      return 'xl';
    }
  }
}
