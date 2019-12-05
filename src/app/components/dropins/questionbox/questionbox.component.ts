import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DebugService } from '@services/utility/debug.service';
import { QuestionService } from '@services/question.service';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { QuestionEditComponent } from '@components/questionedit/questionedit.component';

@Component({
  selector: 'app-questionbox',
  templateUrl: './questionbox.component.html',
  styleUrls: ['./questionbox.component.scss']
})
export class QuestionBoxComponent implements OnInit {

  @Input() question: any;

  dialogOpen = false;

  constructor(
    public router: Router,
    public debug: DebugService,
    public qService: QuestionService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
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

}
