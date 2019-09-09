import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Inject } from '@angular/core';
import { DebugService } from '../../services/debug.service';
import { SearchService } from '../../services/search.service';
import { SubjectsService } from '../../services/subjects.service';
import { SourceService } from '../../services/source.service';

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
  editionText: string;

  questionSearchResults = [];
  subjectSearchResults = [];
  sourceSearchResults = [];

  selectedSubjectURL = '';
  selectedSourceId = '';

  selectedSubject = '';
  selectedSource = '';

  sourceReadyToAdd = false;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<SearchpopupComponent>,
    public debug: DebugService,
    public search: SearchService,
    public subjectService: SubjectsService,
    public sourceService: SourceService,
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
      source: [this.sourceText, []],
      edition: [this.editionText, []]
    });

    this.questionText = this.question;
    this.topicText = '';
    this.sourceText = '';
    this.editionText = '';
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
    if (this.questionText.length > 0 && this.selectedSubject.length > 0 && this.selectedSource.length > 0) {
      this.formComplete = true;
    } else {
      this.formComplete = false;
    }
  }

  addSubject() {
    // Trim isn't supported by IE 8 so this is a workaround
    let subject = this.topicText.replace(/^\s+|\s+$/g, '');
    // Replace spaces with dashes
    subject = subject.replace(/\s/g, '-');

    this.subjectService.addNewSubject(subject).subscribe(data => {
      this.topicText = '';
    });
  }

  addSource() {
    // Trim isn't supported by IE 8 so this is a workaround
    const sourceName = this.sourceText.replace(/^\s+|\s+$/g, '');
    let edition: string;

    if (this.editionText.length && /^\d+$/.test(this.editionText) && this.editionText !== '0') {
      edition = this.editionText;
    } else {
      edition = '1';
    }

    this.sourceService.addNewSource(sourceName, edition).subscribe(data => {
      this.sourceText = '';
      this.editionText = '';
    });
  }

  // Search stuff
  subjectKeyup() {
    const minLength = 1;
    this.checkFormComplete();
    if (this.topicText.length > minLength && this.subjectSearchResults.length === 0) {
      this.search.subjectSearch(this.topicText).subscribe(data => {
        const res: any = data;
        this.subjectSearchResults = res.subjects;
      });
    } else if (this.topicText.length <= minLength) {
      this.subjectSearchResults = [];
    }
  }

  taSubjectSelected(subject) {
    this.selectedSubjectURL = subject.item.subjectURL;
    this.selectedSubject = subject.item.name;
    this.checkFormComplete();
  }

  sourceKeyup() {
    const minLength = 1;
    this.checkFormComplete();
    if (this.sourceText.length > minLength && this.sourceSearchResults.length === 0) {
      this.search.sourceSearch(this.sourceText).subscribe(data => {
        const res: any = data;
        this.sourceSearchResults = res.sources;
      });
    } else if (this.sourceText.length <= minLength) {
      this.sourceSearchResults = [];
    }
  }

  taSourceSelected(source) {
    this.selectedSourceId = source.item._id;
    this.selectedSource = source.item.name;
    this.checkFormComplete();
  }
}
