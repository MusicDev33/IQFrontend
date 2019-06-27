import { Component, OnInit } from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Inject } from '@angular/core';

@Component({
  selector: 'app-searchpopup',
  templateUrl: './searchpopup.component.html',
  styleUrls: ['./searchpopup.component.css']
})
export class SearchpopupComponent implements OnInit {
  @ViewChild('questionInput', {static: false}) qInput: ElementRef;
  @ViewChild('topicInput', {static: false}) tInput: ElementRef;
  @ViewChild('sourceInput', {static: false}) sInput: ElementRef;

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

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<SearchpopupComponent>,
    @Inject(MAT_DIALOG_DATA) data //This is used to access the data PASSED IN from the previous component
    ) {
      this.description = data.description
      this.question = data.question
  }

  ngOnInit() {
    this.questionMode = true
    this.topicMode = false
    this.sourceMode = false

    this.formComplete = false;
    this.form = this.fb.group({
      description: [this.description, []],
      question: [this.question, []],
      topic: [this.topic, []],
      source: [this.source, []]
    });

    this.questionText = this.question;
    this.topicText = ""
    this.sourceText = ""
  }

  close() {
    this.dialogRef.close(this.form.value);
  }

  askQuestion(){
    this.dialogRef.close(this.form.value);
  }

  autoGrow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
  }

  questionModeOn(){
    this.questionMode = true
    this.topicMode = false
    this.sourceMode = false
  }

  topicModeOn(){
    this.questionMode = false
    this.topicMode = true
    this.sourceMode = false
  }

  sourceModeOn(){
    this.questionMode = false
    this.topicMode = false
    this.sourceMode = true
  }

  checkFormComplete(){
    if (this.questionText.length > 0 && this.topicText.length > 0 && this.sourceText.length > 0){
      this.formComplete = true
    }else{
      this.formComplete = false
    }
  }

  focusQuestion(){

  }

}
