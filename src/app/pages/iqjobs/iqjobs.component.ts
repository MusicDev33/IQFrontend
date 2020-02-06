import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { JobAppsService } from '@services/backend/jobapps.service';

@Component({
  selector: 'app-iqjobs',
  templateUrl: './iqjobs.component.html',
  styleUrls: ['./iqjobs.component.scss']
})
export class IQJobsComponent implements OnInit {

  jobsList: Array<string>;
  jobIndex = 0;

  fullNameField = '';
  email = '';
  phoneNumber = '';
  skills = '';

  constructor(
    public jobAppsService: JobAppsService,
    public flashMsg: FlashMessagesService
  ) { }

  ngOnInit() {
    this.jobsList = ['Content Management Agent'];
  }

  increaseJobIndex() {
    if (this.jobIndex >= this.jobsList.length - 1) {
      this.jobIndex = this.jobsList.length - 1;
    } else {
      this.jobIndex += 1;
    }
  }

  decreaseJobIndex() {
    if (this.jobIndex <= 0) {
      this.jobIndex = 0;
    } else {
      this.jobIndex -= 1;
    }
  }

  clickedOnApply() {
    const jobApplication = {
      phoneNumber: this.phoneNumber,
      email: this.email,
      name: this.fullNameField,
      skills: this.skills,
      job: this.jobsList[this.jobIndex],
      jobType: 'Entry'
    }

    this.jobAppsService.sendJobApplication(jobApplication).subscribe(data => {
      const res: any = data;
      this.phoneNumber = '';
      this.fullNameField = '';
      this.email = '';
      this.skills = '';
      if (res.success) {
        this.flashMsg.show(res.msg, { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMsg.show(res.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  allFieldsFilled(): boolean {
    if (this.fullNameField.length && this.email.length && this.phoneNumber.length) {
      return true;
    } else {
      return false;
    }
  }
}
