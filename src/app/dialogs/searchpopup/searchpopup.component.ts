import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FlashMessagesService } from 'angular2-flash-messages';

import { DebugService } from '@services/utility/debug.service';
import { SearchService } from '@services/search.service';
import { SubjectsService } from '@services/subjects.service';
import { SourceService } from '@services/source.service';

import { ISubject } from '@interfaces/schemas/ISubject';
import { ISource } from '@interfaces/schemas/ISource';

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

  subjectPlaceholder = 'Enter subject name';
  sourcePlaceholder = 'Enter source name';

  addedTags = [];
  selectedSourceTags = [];

  selectTagMode = false;

  // A string in the format tag&tag&tag that acts as an array because I'm dumb and
  // can't be bothered to re-write the stupid formgroup
  addedTagsString = new FormControl('');

  sourceHasNoResults = false;
  subjectHasNoResults = false;

  createdTags = [];

  fileFormData = new FormData();
  defaultFileName = 'Upload';
  currentFileName = this.defaultFileName;
  details = '';
  addLinkMode = false;
  linkText = '';

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<SearchpopupComponent>,
    public debug: DebugService,
    public search: SearchService,
    public subjectService: SubjectsService,
    public flashMsg: FlashMessagesService,
    public sourceService: SourceService,
    public http: HttpClient,
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
      topic: [this.selectedSubject, []],
      source: [this.selectedSource, []],
      tagName: [this.tagName, []],
      tags: [this.addedTagsString, []],
      details: [this.details, []]
    });

    this.questionText = this.question;
    this.topicText = '';
    this.sourceText = '';
  }

  close() {
    this.dialogRef.close();
  }

  onSpacePressed(event: Event) {
    if (this.questionText.length <= 0) {
      this.close();
    }
  }

  askQuestion() {
    this.addedTagsString.setValue(this.addedTags.concat(this.createdTags).join('&'));
    if (this.addLinkMode) {
      this.details = this.linkText;
      console.log(this.linkText);
      this.form = this.fb.group({
        description: [this.description, []],
        question: [this.questionText, []],
        topic: [this.selectedSubject, []],
        source: [this.selectedSource, []],
        tagName: [this.tagName, []],
        tags: [this.addedTagsString, []],
        details: [this.details, []]
      });
      this.dialogRef.close(this.form.value);
    }
    if (this.currentFileName !== this.defaultFileName) {
      const headersTemplate = new HttpHeaders();
      let headers = headersTemplate.set('IQ-User-Agent', 'IQAPIv1');
      headers = headers.set('Authorization', localStorage.getItem('id_token'));
      this.http.post('https://inquantir.com/tsapi/v1/upload/question/img', this.fileFormData, {headers})
      .subscribe( (result: any) => {
        this.details = result.fileURL;
        console.log(result);
        console.log(this.topicText);
        this.form = this.fb.group({
          description: [this.description, []],
          question: [this.questionText, []],
          topic: [this.selectedSubject, []],
          source: [this.selectedSource, []],
          tagName: [this.tagName, []],
          tags: [this.addedTagsString, []],
          details: [this.details, []]
        });
        this.dialogRef.close(this.form.value);
      });
    }

    if (this.currentFileName === this.defaultFileName && !this.addLinkMode) {
      this.form = this.fb.group({
        description: [this.description, []],
        question: [this.questionText, []],
        topic: [this.selectedSubject, []],
        source: [this.selectedSource, []],
        tagName: [this.tagName, []],
        tags: [this.addedTagsString, []],
        details: [this.details, []]
      });
      this.dialogRef.close(this.form.value);
    }
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
  }

  sourceModeToggle() {
    this.topicMode = false;
    this.selectTagMode = false;
    this.sourceMode = !this.sourceMode;
    this.sourceText = '';
  }

  tagModeToggle() {
    this.sourceMode = false;
    this.topicMode = false;
    this.addedTags = [];
    this.selectTagMode = !this.selectTagMode;
  }

  onCancelSubject() {
    this.selectedSubject = '';
    this.selectedSubjectURL = '';
  }

  onCancelSource() {
    this.selectedSource = '';
    this.selectedSourceId = '';
    this.selectedSourceTags = [];
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
  subjectKeyup(event: KeyboardEvent) {
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

    if (this.selectedSubject !== this.topicText && event.key !== 'Enter') {
      this.selectedSubject = '';
      this.selectedSubjectURL = '';
    }
  }

  // WTF is TA?
  taSubjectSelected(subjectResult: any) {
    const subject: ISubject = subjectResult.item;
    this.selectedSubjectURL = subject.subjectURL;
    this.selectedSubject = subject.name;
    this.checkFormComplete();
    this.topicText = '';
  }

  sourceKeyup(event: KeyboardEvent) {
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
    if (this.sourceText !== this.selectedSource && event.key !== 'Enter') {
      this.selectedSource = '';
      this.selectedSourceId = '';
      this.selectedSourceTags = [];
    }
  }

  taSourceSelected(sourceResult: any) {
    const source: ISource = sourceResult.item;
    this.selectedSourceTags = source.tags;
    this.selectedSourceId = source._id;
    this.selectedSource = source.name;
    this.checkFormComplete();
    this.sourceText = '';
  }

  subjectNoResults(noResults: boolean) {
    this.subjectHasNoResults = noResults;
  }

  sourceNoResults(noResults: boolean) {
    this.sourceHasNoResults = noResults;
  }

  createFileData(files: FileList) {
    const selectedFile = files.item(0);
    this.fileFormData = new FormData();
    this.fileFormData.append('upload', selectedFile, selectedFile.name);
    this.currentFileName = selectedFile.name;
    this.details = this.currentFileName;
  }

  cancelFileUpload() {
    this.currentFileName = this.defaultFileName;
    this.addLinkMode = false;
  }
}
