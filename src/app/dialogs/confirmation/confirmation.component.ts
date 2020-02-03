import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  title: string;
  msg: string;
  cancelText: string;
  confirmText: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) data: {title: string, msg: string, cancel: string, confirm: string}
  ) {
    this.title = data.title;
    this.msg = data.msg;
    this.cancelText = data.cancel;
    this.confirmText = data.confirm;
  }

  ngOnInit() {
  }

  cancelButtonClicked() {
    this.dialogRef.close();
  }

  confirmButtonClicked() {
    this.dialogRef.close(true);
  }

}
