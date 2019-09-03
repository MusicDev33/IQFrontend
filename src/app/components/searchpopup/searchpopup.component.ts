import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Inject } from '@angular/core';
import { DebugService } from '../../services/debug.service';
import { SearchService } from '../../services/search.service';

import { Observable, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-searchpopup',
  templateUrl: './searchpopup.component.html',
  styleUrls: ['./searchpopup.component.css']
})
export class SearchpopupComponent implements OnInit {

  description: string;
  question: string;
  topic: string;
  source: string;
  form: FormGroup;

  questionMode: boolean;
  topicMode: boolean;
  sourceMode: boolean;

  formComplete: boolean;

  questionText: string;
  topicText: string;
  sourceText: string;

  questionSearchResults = [];
  subjectSearchResults = [];
  sourceSearchResults = [];

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<SearchpopupComponent>,
    public debug: DebugService,
    public search: SearchService,
    @Inject(MAT_DIALOG_DATA) data // This is used to access the data PASSED IN from the previous component
    ) {
      this.description = data.description;
      this.question = data.question;
  }

  ngOnInit() {
    this.questionMode = true;
    this.topicMode = false;
    this.sourceMode = false;

    this.formComplete = false;
    this.form = this.fb.group({
      description: [this.description, []],
      question: [this.questionText, []],
      topic: [this.topicText, []],
      source: [this.sourceText, []]
    });

    this.questionText = this.question;
    this.topicText = '';
    this.sourceText = '';
  }

  close() {
    this.dialogRef.close();
  }

  askQuestion() {
    this.dialogRef.close(this.form.value);
  }

  autoGrow(element) {
    element.style.height = '5px';
    element.style.height = (element.scrollHeight) + 'px';
  }

  questionModeOn() {
    this.questionMode = true;
    this.topicMode = false;
    this.sourceMode = false;
  }

  topicModeOn() {
    this.questionMode = false;
    this.topicMode = true;
    this.sourceMode = false;
  }

  sourceModeOn() {
    this.questionMode = false;
    this.topicMode = false;
    this.sourceMode = true;
  }

  checkFormComplete() {
    if (this.questionText.length > 0 && this.topicText.length > 0 && this.sourceText.length > 0) {
      this.formComplete = true;
    } else {
      this.formComplete = false;
    }
  }

  // Search stuff
  subjectKeyup() {
    this.checkFormComplete();
    if (this.topicText.length > 2 && this.subjectSearchResults.length === 0) {
      this.search.subjectSearch(this.topicText).subscribe(data => {
        const res: any = data;
        this.subjectSearchResults = res.sources;
      });
    } else if (this.topicText.length <= 2) {
      this.subjectSearchResults = [];
    }
  }

  taSubjectSelected(subject) {

  }
}
