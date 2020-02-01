import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { FlashMessagesService } from 'angular2-flash-messages';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { DebugService } from '@services/utility/debug.service';
import { SearchService } from '@services/search.service';
import { SubjectsService } from '@services/subjects.service';
import { SourceService } from '@services/source.service';

@Component({
  selector: 'app-searchpopup',
  templateUrl: './searchpopup.component.html',
  styleUrls: ['./searchpopup.component.scss']
})
export class SearchpopupComponent implements OnInit {

  description: string;
  question: string;
  topic: string;
  source: string;
  tagName: string;
  form: FormGroup;

  questionMode = false;
  topicMode = false;
  sourceMode = false;

  formComplete: boolean;

  questionText: string;
  topicText = '';
  sourceText = '';
  tagText = '';

  questionSearchResults = [];
  subjectSearchResults = [];
  sourceSearchResults = [];

  selectedSubjectURL = '';
  selectedSourceId = '';

  selectedSubject = '';
  selectedSource = '';

  subjectDropdownText = 'Add Subject';
  sourceDropdownText = 'Add Source';

  subjectPlaceholder = 'Enter a subject name';
  sourcePlaceholder = 'Enter a source name';

  addedTags = [];
  selectedSourceTags = [];

  selectTagMode = false;

  // A string in the format tag&tag&tag that acts as an array because I'm dumb and
  // can't be bothered to re-write the stupid formgroup
  addedTagsString = new FormControl('');

  sourceHasNoResults = false;
  subjectHasNoResults = false;

  createdTags = [];

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<SearchpopupComponent>,
    public debug: DebugService,
    public search: SearchService,
    public subjectService: SubjectsService,
    public flashMsg: FlashMessagesService,
    public sourceService: SourceService,
    @Inject(MAT_DIALOG_DATA) data: any // This is used to access the data PASSED IN from the previous component
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
      tagName: [this.tagName, []],
      tags: [this.addedTagsString, []]
    });

    this.questionText = this.question;
    this.topicText = '';
    this.sourceText = '';
  }

  close() {
    this.dialogRef.close();
  }

  askQuestion() {
    this.addedTagsString.setValue(this.addedTags.concat(this.createdTags).join('&'));
    this.dialogRef.close(this.form.value);
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

  topicModeToggle() {
    this.sourceMode = false;
    this.selectTagMode = false;
    this.topicMode = !this.topicMode;
    this.topicText = '';
    this.selectedSubject = '';
    this.selectedSubjectURL = '';
  }

  sourceModeToggle() {
    this.topicMode = false;
    this.selectTagMode = false;
    this.sourceMode = !this.sourceMode;
    this.sourceText = '';
    this.selectedSource = '';
    this.selectedSourceId = '';
  }

  tagModeToggle() {
    this.sourceMode = false;
    this.topicMode = false;
    this.addedTags = [];
    this.selectTagMode = !this.selectTagMode;
  }

  disableAllModes() {
    this.sourceMode = false;
    this.topicMode = false;
    this.selectTagMode = false;
  }

  setSubjectDropdown(mode: number) {
    if (mode === 1) {
      this.subjectDropdownText = 'Add Subject';
      this.subjectPlaceholder = 'Enter a subject name';
    } else {
      this.subjectDropdownText = 'Create Subject';
      this.subjectPlaceholder = 'Insert subject name to be created';
    }
  }

  setSourceDropdown(mode: number) {
    if (mode === 1) {
      this.sourceDropdownText = 'Add Source';
      this.sourcePlaceholder = 'Enter a source name';
    } else {
      this.sourceDropdownText = 'Create Source';
      this.sourcePlaceholder = 'Enter source name and edition';
    }
  }

  checkFormComplete() {
    if (this.questionText.length > 0 && this.selectedSubject.length > 0) {
      this.formComplete = true;
    } else {
      this.formComplete = false;
    }
  }

  addTag(tag: string) {
    const index = this.addedTags.indexOf(tag);
    if (index <= -1) {
      this.addedTags.push(tag);
    } else {
      this.addedTags.splice(index, 1);
    }
  }

  // Create new subject
  addSubject() {
    // Trim isn't supported by IE 8 so this is a workaround
    let subject = this.topicText.replace(/^\s+|\s+$/g, '');
    // Replace spaces with dashes
    subject = subject.replace(/\s/g, '-');

    this.subjectService.addNewSubject(subject).subscribe(data => {
      const res: any = data;
      this.topicText = res.subject.name;
      this.selectedSubject = res.subject.name;
      this.selectedSubjectURL = res.subject.subjectURL;
      this.checkFormComplete();
    });
  }

  // Create new source
  addSource() {
    // Trim isn't supported by IE 8 so this is a workaround
    const sourceName = this.sourceText.replace(/^\s+|\s+$/g, '');

    this.sourceService.addNewSource(sourceName).subscribe(data => {
      const res: any = data;
      this.sourceText = res.source.name;
      this.selectedSource = res.source.name;
      this.selectedSourceId = '' + res.source._id;
    });
  }

  addTagToCreatedTags(tagName: string) {
    const index = this.createdTags.indexOf(tagName);
    const indexInSourceTags = this.selectedSourceTags.indexOf(tagName);

    if (index < 0 && indexInSourceTags < 0) {
      this.createdTags.push(tagName.toLowerCase());
      this.tagText = '';
    } else {
      this.tagText = '';
    }
  }

  deleteTagFromCreatedTags(tagName: string) {
    const index = this.createdTags.indexOf(tagName);
    if (index !== -1) { this.createdTags.splice(index, 1); }
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

    if (this.selectedSubject !== this.topicText) {
      this.selectedSubject = '';
      this.selectedSubjectURL = '';
    }
  }

  // WTF is TA?
  taSubjectSelected(subject: any) {
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
    if (this.sourceText !== this.selectedSource) {
      this.selectedSource = '';
      this.selectedSourceId = '';
      this.selectedSourceTags = [];
    }
  }

  taSourceSelected(source: any) {
    this.selectedSourceTags = source.item.tags;
    this.selectedSourceId = source.item._id;
    this.selectedSource = source.item.name;
    this.checkFormComplete();
  }

  subjectNoResults(noResults: boolean) {
    this.subjectHasNoResults = noResults;
  }

  sourceNoResults(noResults: boolean) {
    this.sourceHasNoResults = noResults;
  }
}
