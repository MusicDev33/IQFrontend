import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { DebugService } from '@services/utility/debug.service';

@Component({
  selector: 'app-questionedit',
  templateUrl: './questionedit.component.html',
  styleUrls: ['./questionedit.component.scss']
})
export class QuestionEditComponent implements OnInit {
  question: any;
  sourceName = '';
  newTagName = '';

  testTags = ['animals', 'mario', 'tag9 and long', 'tekken', 'toofast', 'chapter 9', 'chapter 347', 'the bible verse 7'];

  addTagOpen = false;
  addTagText = '';

  constructor(
    public debug: DebugService,
    public dialogRef: MatDialogRef<QuestionEditComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.question = data.question;
    this.debug.log(data);
  }

  ngOnInit() {
    this.sourceName = this.question.homeworkSource;
  }

  toggleOpenTag() {
    this.addTagOpen = !this.addTagOpen;
    this.addTagText = 'Add Tag';
  }

  addTag(tagName: string) {
    if (tagName !== '') {
      this.question.tags.push(tagName);
      this.newTagName = '';
    }
  }

  deleteTag(tagName: string) {
    const index = this.question.tags.indexOf(tagName);
    if (index !== -1) {
      this.question.tags.splice(index, 1);
    }
  }
}
