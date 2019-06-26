import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Inject } from '@angular/core';

@Component({
  selector: 'app-searchpopup',
  templateUrl: './searchpopup.component.html',
  styleUrls: ['./searchpopup.component.css']
})
export class SearchpopupComponent implements OnInit {
  description: string;
  question: string;
  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<SearchpopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
    ) {
      this.description = data.description

  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []],
      question: [this.question, []]
    });
  }

  close() {
    this.dialogRef.close();
  }

  askQuestion(){
    this.dialogRef.close(this.form.value);
  }

  autoGrow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
  }

}
