import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AnswerService } from '../../services/answer.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DebugService } from '../../services/debug.service';
import { VotesService } from '../../services/votes.service';

import * as specialChars from '../../globals/specialchars';

interface Answer {
  answerText: string;
  votes: number;
  poster: string;
  views: number;
  comments: Array<object>;
  questionURL: string;
  posterID: string;
  _id: string;
}

interface IUser {
  name: string;
  _id: string;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question: any;
  answers: Array<Answer>;
  questionURL: string;
  answerText = '';
  hasAnswered: boolean;
  userHasAnswered: boolean;

  answerMode: boolean;

  mathMode = false;

  // This dictionary is in the following format - answerID:vote
  // Example:
  // 5d1ea3de81e1ef53f657baf7: 1 this means that the answer has been given an upvote
  // 5d1ea3de81e1ef53f657baf7: -1 is a downvote
  // 5d1ea3de81e1ef53f657baf7: 0 is no vote, only for when the user cancels a vote.
  votedAnswers: any = {};

  greekChars = specialChars.greekChars;

  constructor(
    public questionService: QuestionService,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public userService: UserService,
    public answerService: AnswerService,
    public flashMsg: FlashMessagesService,
    public router: Router,
    public debug: DebugService,
    public votesService: VotesService) { }

  ngOnInit() {
    this.answerMode = false;
    this.questionURL = this.activatedRoute.snapshot.paramMap.get('id');
    let response: any = {};
    this.questionService.getQuestion(this.questionURL).subscribe(data => {
      response = data;
      this.question = response.question;
      this.debug.log(this.question);

      this.votesService.getVotes(this.question._id, this.userService.userMongoID()).subscribe(data => {
        let response: any = {};
        response = data;
        this.debug.log(data);
        if (response.votes) {
          response.votes.forEach((vote: any) => {
            if (vote.vote !== 0) {
              this.votedAnswers[vote.answerid] = vote.vote;
            }
          });
          this.debug.log(this.votedAnswers);
        }
      });

    }, err => {
      this.debug.log(err);
      return false;
    });

    this.answerService.getAnswers(this.questionURL).subscribe(data => {
      let res: any = {};
      let user: IUser;
      res = data;
      this.answers = res.answers;

      user = this.userService.getUser();

      this.answers.forEach( (answer) => {
        this.debug.log(answer);
        if (answer.poster === user.name) {
          this.userHasAnswered = true;
        }
      });
    });
  }

  toProfileWithHandle(handle: string) {
    const profileURL = '/profile/' + handle;
    this.router.navigate([profileURL]);
  }

  sendAnswer() {
    const answer = {
      answerText: this.answerText,
      poster: this.userService.getUser().name,
      posterHandle: this.userService.getUser().handle,
      posterID: this.userService.userMongoID(),
      votes: 0,
      questionURL: this.questionURL,
      views: 1,
      comments: [],
      questionText: this.question.questionText,

    };
    this.debug.log(answer);

    this.answerService.sendAnswer(answer, this.questionURL).subscribe(data => {
      const response: any = data;
      if (response.success) {
        this.flashMsg.show('Answer added.', {cssClass: 'alert-success', timeout: 1500});
        this.answerText = '';
        this.answerMode = false;
        this.userHasAnswered = true;
        this.answers.unshift(response.answer);
      } else {
        this.flashMsg.show('Something went wrong. Try answering again.', {cssClass: 'alert-danger', timeout: 1500});
      }
    });
  }

  deleteAnswer(answerID) {
    this.answerService.deleteAnswer(this.questionURL, answerID).subscribe(data => {
      const res: any = data;
      this.answers = this.answers.filter((answer) => {
        return answer._id !== res.answer._id;
      });
    });
  }

  // Still trying to figure out a good way to do this...
  voteClicked(answer, castVote) {
    const negCastVote = 0 - castVote;
    if (answer._id in this.votedAnswers) {
      const vote = this.votedAnswers[answer._id];
      switch (vote) {
        case castVote: {
          // Cancelling upvote
          answer.votes -= castVote;
          delete this.votedAnswers[answer._id];
          this.sendVote(0, answer._id);
          break;
        }
        case negCastVote: {
          answer.votes += 2 * castVote;
          this.votedAnswers[answer._id] = castVote;
          this.sendVote(castVote, answer._id);
          break;
        }
        default: {
          this.debug.log('Voting got broken somehow...');
          this.debug.log(vote);
          break;
        }
      }
    } else {
      // Send upvote
      answer.votes += castVote;
      this.votedAnswers[answer._id] = castVote;
      this.sendVote(castVote, answer._id);
    }
  }

  sendVote(vote, answerid) {
    this.votesService.sendVote(this.question._id, this.userService.userMongoID(), answerid, vote).subscribe(data => {
      const response: any = {};
    });
  }

  getVote(answer) {
    if (answer._id in this.votedAnswers) {
      this.debug.log(this.votedAnswers);
      return this.votedAnswers[answer._id];
    } else {
      return 0;
    }
  }

  toggleMathMode() {
    this.mathMode = !this.mathMode;
  }

  preventFocusLoss(event) {
    event.preventDefault();
  }

  addToAnswerText(text: string) {
    this.answerText += text;
  }
}
