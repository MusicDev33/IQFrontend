import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DebugService } from '@services/utility/debug.service';
import { QuestionService } from '@services/question.service';
import { SourceService } from '@services/source.service';
import { SearchService } from '@services/search.service';

@Component({
  selector: 'app-questionedit',
  templateUrl: './questionedit.component.html',
  styleUrls: ['./questionedit.component.scss']
})
export class QuestionEditComponent implements OnInit {
  question: any;
  sourceName = '';
  newTagName = '';

  addTagOpen = true;
  addTagText = 'Add Tag';

  sourceSearchResults = [];
  sourceSelected = false;

  constructor(
    public debug: DebugService,
    public qService: QuestionService,
    public search: SearchService,
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
      this.qService.editQuestionTags(this.question).subscribe(data => {
        this.debug.log(data);
      });
    }
  }

  deleteTag(tagName: string) {
    const index = this.question.tags.indexOf(tagName);
    if (index !== -1) {
      this.question.tags.splice(index, 1);
      this.qService.editQuestionTags(this.question).subscribe(data => {
        this.debug.log(data);
      });
    }
  }

  changeQuestionSource() {
    this.question.homeworkSource = this.sourceName;
    this.sourceSelected = false;
    this.qService.editQuestionSource(this.question).subscribe(data => {
      this.debug.log(data);
    });
  }

  findSourceKeyUp() {
    const minLength = 1;
    if (this.sourceName.length > minLength && this.sourceSearchResults.length === 0) {
      this.search.sourceSearch(this.sourceName).subscribe(data => {
        const res: any = data;
        this.sourceSearchResults = res.sources;
      });
    } else if (this.sourceName.length <= minLength) {
      this.sourceSearchResults = [];
    }
  }

  onSourceSelected(source: any) {
    this.debug.log(source);
    if (source.item.name !== this.question.homeworkSource) {
      this.sourceSelected = true;
    }
  }
}
