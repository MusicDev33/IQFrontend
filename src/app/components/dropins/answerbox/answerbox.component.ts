import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '@services/user.service';

import { IAnswer } from '@interfaces/schemas/IAnswer';
import { IUser } from '@interfaces/schemas/IUser';

@Component({
  selector: 'app-answerbox',
  templateUrl: './answerbox.component.html',
  styleUrls: ['./answerbox.component.scss']
})
export class AnswerBoxComponent implements OnInit {

  @Input() answer: IAnswer;

  user: IUser;
  imageLoaded = false;

  constructor(public userService: UserService) { }

  ngOnInit() {
    if (this.answer.posterHandle.length) {
      this.userService.publicGetUserByHandle(this.answer.posterHandle).subscribe((getUserData: any) => {
        this.user = getUserData.user;
      });
    }
  }

}
