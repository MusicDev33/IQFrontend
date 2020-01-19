import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { IQAuthService } from '@services/backend/iqauth.service';
import { UserService } from '@services/user.service';
import { SubjectsService } from '@services/subjects.service';
import { QuestionService } from '@services/question.service';
import { DebugService } from '@services/utility/debug.service';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { QuestionEditComponent } from '@components/questionedit/questionedit.component';

import { IUser } from '@interfaces/schemas/IUser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: IUser;
  questions: Array<object>;
  subjects: Array<string>;
  subject: string;

  arrayOfSubjects: Array<string>;
  subjectOffset = 0;

  screenHeight: number;
  screenWidth: number;

  // The string that tells a user what to do after they create a profile
  helpString = '';
  dialogOpen = false;

  constructor(
    public dialog: MatDialog,
    public authService: IQAuthService,
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

    this.subjectsService.getAllSubjects().subscribe(subjectData => {
      let subjectResponse: any = {};
      subjectResponse = subjectData;
      this.arrayOfSubjects = subjectResponse.subjects;
    });
  }

  // TODO: Create types for everything...
  editQuestionClicked(question: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.position = {
      top: '80px'
    };
    dialogConfig.panelClass = 'dialog-popup';

    dialogConfig.data = {
      question
    };

    this.dialogOpen = true;
    const dialogRef = this.dialog.open(QuestionEditComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(editData => {
      this.dialogOpen = false;
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

  questionClicked(text: string) {
    const questionURL = this.qService.questionTextToURL(text);
    const routeURL = '/question/' + questionURL;
    this.router.navigate([routeURL]);
  }

  userClicked(userHandle: string) {
    const routeURL = '/profile/' + userHandle;
    this.router.navigate([routeURL]);
  }

  followButtonClicked(subject) {
    this.subjects.push(subject.name);
    this.userService.changeUserProperty('currentSubjects', this.subjects).subscribe((result: any) => {

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

  calcMaxOffset(): number {
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

  nSubjects(n: number): string[] {
    const end = this.arrayOfSubjects.length;
    if (this.arrayOfSubjects.length - (this.subjectOffset * n) < n) {
      return this.arrayOfSubjects.slice(this.subjectOffset * n, end);
    } else {
      return this.arrayOfSubjects.slice(this.subjectOffset * n, (this.subjectOffset * n) + n);
    }
  }

  returnScreenBreakpoint(): string {
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

  hasUserFilledProfile(user: IUser): boolean {
    if (user.currentSubjects && user.currentSubjects.length >= 3) {
      return true;
    } else {
      return false;
    }
  }

  createHelpText(user: IUser): string {
    this.helpString = 'You\'ve created an account! ';
    // If user has followed 3 subjects but hasn't added knowledgeable topics
    if (user.currentSubjects && user.currentSubjects.length < 3) {
      this.helpString += 'Follow some topics and customize your profile to really make Inquantir feel like home!';
    } else {
      this.helpString += 'Follow some topics and customize your profile to really make Inquantir feel like home!';
    }
    return this.helpString;
  }

  onSubjectNameClicked(subjectURL: string) {
    // Spaces are turned into dashes
    const url = subjectURL.trim().replace(/[ ]+/ig, '-');
    this.router.navigate(['/iqt/' + url]);
  }

  onSourceClicked(sourceName: string) {
    localStorage.setItem('lib-key', sourceName);
    this.router.navigate(['/library']);
  }
}
