import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-questionedit',
  templateUrl: './questionedit.component.html',
  styleUrls: ['./questionedit.component.scss']
})
export class QuestionEditComponent implements OnInit {
  question: any;
  sourceName = '';

  testTags = ['animals', 'mario', 'tag9 and long', 'tekken', 'toofast', 'chapter 9', 'chapter 347', 'the bible verse 7'];

  constructor(
    public dialogRef: MatDialogRef<QuestionEditComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.question = data.question;
  }

  ngOnInit() {
    this.sourceName = this.question.homeworkSource;
  }

}
