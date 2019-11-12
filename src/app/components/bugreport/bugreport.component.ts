import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { UserService } from '@services/user.service';
import { FeedbackService } from '@services/feedback.service';

@Component({
  selector: 'app-bugreport',
  templateUrl: './bugreport.component.html',
  styleUrls: ['./bugreport.component.scss']
})
export class BugReportComponent implements OnInit {

  placeholderText = 'Don\'t like something about Inquantir or think it could be improved? Let us know!';
  selectedMode = 'Suggestion';
  inputError = false;
  feedbackText = '';

  constructor(
    public dialogRef: MatDialogRef<BugReportComponent>,
    public userService: UserService,
    public feedbackService: FeedbackService
  ) { }

  ngOnInit() {
  }

  close(result: string) {
    if (!result) {
      this.dialogRef.close();
    } else {
      this.dialogRef.close(result);
    }
  }

  changeMode(mode: string) {
    this.selectedMode = mode;
    if (mode === 'Suggestion') {
      this.placeholderText = 'Don\'t like something about Inquantir or think it could be improved? Let us know!';
    } else {
      this.placeholderText = 'Report bugs here! We\'ll try to address them as fast as possible!';
    }
  }

  sendFeedback() {
    const spacesInString = this.feedbackText.split(' ').length - 1;
    if (this.feedbackText.length < 10 && spacesInString >= 4) {
      this.inputError = true;
    }

    const feedback = {
      userHandle: this.userService.getUser().handle,
      userName: this.userService.getUser().name,
      feedback: this.feedbackText,
      type: this.selectedMode
    };

    this.feedbackService.sendFeedback(feedback).subscribe( data => {
      const res: any = data;
      this.close(res.msg);
    });
  }
}
