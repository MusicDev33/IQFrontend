import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DebugService } from '@services/utility/debug.service';
import { QuestionService } from '@services/question.service';
import { UserService } from '@services/user.service';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { QuestionEditComponent } from '@components/questionedit/questionedit.component';
import { ReportQuestionComponent } from '@components/reportquestion/reportquestion.component';

import { IUser } from '@interfaces/schemas/IUser';
import { IQuestion } from '@interfaces/schemas/IQuestion';

@Component({
  selector: 'app-questioncard',
  templateUrl: './questioncard.component.html',
  styleUrls: ['./questioncard.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() poster: string;
  @Input() questionText: string;
  @Input() answerText: string;
  @Input() question: IQuestion;
  @Input() cardType ? = 'single';
  @Input() profileImageUrl: string;

  user: IUser;
  imageLoaded = false;

  dialogOpen = false;

  constructor(
    public router: Router,
    public debug: DebugService,
    public qService: QuestionService,
    public dialog: MatDialog,
    public userService: UserService
  ) { }

  ngOnInit() {
    if (this.question && this.question.previewAnswer) {
      this.userService.publicGetUserByHandle(this.question.previewAnswer.posterHandle).subscribe((userRes: any) => {
        this.user = userRes.user;
      });
    }
  }

  questionClicked(text: string) {
    const questionURL = this.qService.questionTextToURL(text);
    this.debug.log(questionURL);
    const routeURL = '/question/' + questionURL;
    this.router.navigate([routeURL]);
  }

  userClicked(userHandle: string) {
    const routeURL = '/profile/' + userHandle;
    this.router.navigate([routeURL]);
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

  reportQuestionClicked(question: IQuestion) {
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
    const dialogRef = this.dialog.open(ReportQuestionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(editData => {
      this.dialogOpen = false;
    });
  }
}
