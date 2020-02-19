import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportquestion',
  templateUrl: './reportquestion.component.html',
  styleUrls: ['./reportquestion.component.scss']
})
export class ReportQuestionComponent implements OnInit {

  reasonsArray = ['Harassment', 'Spam', 'Insincere', 'Poorly Written'];
  selectedReason = '';
  explanationText = '';

  constructor() {}

  ngOnInit() {}

  onReasonClicked(reason: string) {
    this.selectedReason = reason;
    console.log(reason);
  }

  onSendClicked() {
    console.log(this.selectedReason);
    console.log(this.explanationText);
  }

}
