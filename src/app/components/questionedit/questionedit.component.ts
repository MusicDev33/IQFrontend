import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-questionedit',
  templateUrl: './questionedit.component.html',
  styleUrls: ['./questionedit.component.scss']
})
export class QuestionEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<QuestionEditComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    console.log(data);
  }

  ngOnInit() {
  }

}
