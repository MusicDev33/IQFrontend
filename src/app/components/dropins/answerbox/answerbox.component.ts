import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

import { UserService } from '@services/user.service';
import { VotesService } from '@services/votes.service';
import { AnswerService } from '@services/answer.service';
import { DebugService } from '@services/utility/debug.service';

import { IAnswer } from '@interfaces/schemas/IAnswer';
import { IUser } from '@interfaces/schemas/IUser';

interface IChildVote {
  vote: number;
  answerID: string;
}

@Component({
  selector: 'app-answerbox',
  templateUrl: './answerbox.component.html',
  styleUrls: ['./answerbox.component.scss']
})
export class AnswerBoxComponent implements OnInit {

  @Input() answer: IAnswer;
  @Input() userVote: number;

  @Output() sendVote: EventEmitter<IChildVote> = new EventEmitter<IChildVote>();
  @Output() sendEditAnswer = new EventEmitter<{answerText: string, answerID: string}>();
  @Output() sendDeleteAnswer = new EventEmitter<{title: string, msg: string, confirm: string, cancel: string, answerID: string}>();

  user: IUser;
  imageLoaded = false;

  constructor(
    public userService: UserService,
    public voteService: VotesService,
    public answerService: AnswerService,
    public debug: DebugService,
    public cbService: ClipboardService
  ) { }

  ngOnInit() {
    if (this.answer.posterHandle.length) {
      this.userService.publicGetUserByHandle(this.answer.posterHandle).subscribe((getUserData: any) => {
        this.user = getUserData.user;
      });
    }

    console.log(this.userVote);
  }

  copyLink() {
    this.cbService.copyFromContent(window.location.href);
  }

  // Still trying to figure out a good way to do this...
  voteClicked(castVote: number) {
    const negCastVote = 0 - castVote;
    if (this.userVote !== 0) {
      switch (this.userVote) {
        case castVote: {
          // Cancelling upvote
          this.answer.votes -= castVote;
          const res = {vote: 0, answerID: this.answer._id};
          this.sendVote.emit(res);
          this.userVote = 0;
          break;
        }
        case negCastVote: {
          this.answer.votes += 2 * castVote;
          this.userVote = castVote;
          const res = {vote: castVote, answerID: this.answer._id};
          this.sendVote.emit(res);
          break;
        }
        default: {
          this.debug.log('Voting got broken somehow...');
          break;
        }
      }
    } else {
      // Send upvote
      this.answer.votes += castVote;
      this.userVote = castVote;
      const res = {vote: castVote, answerID: this.answer._id};
      this.sendVote.emit(res);
    }
  }

  editAnswerClicked() {
    this.sendEditAnswer.emit({answerText: this.answer.answerText, answerID: this.answer._id});
  }

  deleteAnswerClicked() {
    const title = 'Are you sure?';
    const msg = 'This answer will be lost forever!';
    const confirm = 'Delete my answer!';
    const cancel = 'Don\'t delete my answer!';
    this.sendDeleteAnswer.emit({title, msg, confirm, cancel, answerID: this.answer._id});
  }
}
