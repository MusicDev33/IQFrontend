import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IQAuthService } from '@services/backend/iqauth.service';
import { UserService } from '@services/user.service';
import { SubjectsService } from '@services/subjects.service';
import { QuestionService } from '@services/question.service';
import { DebugService } from '@services/utility/debug.service';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { QuestionEditComponent } from '@dialogs/questionedit/questionedit.component';

import { IUser } from '@interfaces/schemas/IUser';
import { ISubject } from '@interfaces/schemas/ISubject';
import { IQuestion } from '@interfaces/schemas/IQuestion';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: IUser;
  questions: IQuestion[];
  subjects: string[];
  subject: string;

  arrayOfSubjects: ISubject[];
  subjectOffset = 0;

  // The string that tells a user what to do after they create a profile
  helpString = '';
  dialogOpen = false;

  currentDiscoverSubjectIndex = 0;

  constructor(
    public dialog: MatDialog,
    public authService: IQAuthService,
    public userService: UserService,
    public router: Router,
    public qService: QuestionService,
    public activatedRoute: ActivatedRoute,
    public debug: DebugService,
    public subjectsService: SubjectsService) {

    }

  ngOnInit() {
    this.userService.getFeed().subscribe(data => {
      let res: any = {};
      res = data;
      this.debug.log(res);
      this.questions = res.feed;
    }, err => {
      this.debug.log(err);
      return false;
    });

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
  editQuestionClicked(question: IQuestion) {
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

  followButtonClicked(subject: ISubject) {
    const index = this.subjects.indexOf(subject.name);
    if (index <= -1) {
      this.subjects.push(subject.name);
    } else if (index > -1) {
      this.subjects.splice(index, 1);
    }

    this.userService.changeUserProperty('currentSubjects', this.subjects).subscribe((result: any) => {

    });
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

  // Currently don't have a decent way of doing this.
  // Basically, the problem is that the client shouldn't be handling this code.
  // The server has the means to do this logic and give it to the client in a
  // much more efficient manner, but for the sake of getting it done now,
  // here's a terrible way of doing this.
  calculateCardType(questionText: string, subject: string) {
    const index = this.questions.map(e => e.questionText).indexOf(questionText);
    if (index >= this.questions.length - 1 && this.questions[index - 1].subject === subject) {
      return 'bottom';
    }

    if (index >= this.questions.length - 1 && this.questions[index - 1].subject !== subject) {
      return 'single';
    }

    if (index === 0 && this.questions[index + 1].subject === subject) {
      return 'header';
    }

    if (index === 0 && this.questions[index + 1].subject !== subject) {
      return 'single';
    }

    if (this.questions[index - 1].subject !== subject && this.questions[index + 1].subject === subject) {
      return 'header';
    }

    if (this.questions[index + 1].subject === subject && this.questions[index - 1].subject === subject) {
      return 'mid';
    }

    if (this.questions[index + 1].subject !== subject && this.questions[index - 1].subject === subject) {
      return 'bottom';
    }

    return 'single';
  }
}
