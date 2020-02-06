import { Component, OnInit } from '@angular/core';
import { CMAgentService } from '@services/backend/cmagent.service';

@Component({
  selector: 'app-cmagentmaster',
  templateUrl: './cmagentmaster.component.html',
  styleUrls: ['./cmagentmaster.component.scss']
})
export class CMAgentMasterComponent implements OnInit {
  editLogs = [];
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  cmAgents = [];
  selectedUser: any = {};

  constructor(public contentManager: CMAgentService) { }

  ngOnInit() {
    this.contentManager.getPaidLogs().subscribe(editLogPayload => {
      const res: any = editLogPayload;
      if (res.success) {
        this.editLogs = res.logs;
      } else {

      }
    })

    this.contentManager.getCMAgents().subscribe(agentsPayload => {
      const res: any = agentsPayload;
      console.log(res)
      if (res.success) {
        this.cmAgents = res.users;
      } else {

      }
    })
  }

  getDateFromID(id: string) {
    const timeStamp = id.toString().substring(0, 8);
    const date = new Date( parseInt(timeStamp, 16) * 1000);

    const day = this.days[date.getDay()];
    const month = this.months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const timeString = hours + ':' + minutes;
    const dateString = day + ', ' + month + ' ' + dayOfMonth + ', ' + year;

    return timeString + ' - ' + dateString;
  }

  selectUser(user: any) {
    this.selectedUser = user;
  }

}
