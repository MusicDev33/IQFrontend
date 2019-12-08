import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { IQAuthService } from '@services/backend/iqauth.service';
import { UserService } from '@services/user.service';
import { QuestionService } from '@services/question.service';
import { AnswerService } from '@services/answer.service';
import { VotesService } from '@services/votes.service';
import { DebugService } from '@services/utility/debug.service';

import { Question } from '@classes/question';
import { Answer } from '@classes/answer';
import { Vote } from '@classes/vote';
import { IServerResponse } from '@interfaces/IServerResponse';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question: Question;
  answers: Array<Answer>;
  questionID: string;
  questionURL: string;
  answerText = '';
  userHasAnswered: boolean;

  questionSuccess: boolean;
  questionResponse: IServerResponse;

  answerMode: boolean;
  editMode = false;
  editAnswerID = '';

  mathMode = false;
  answerPreview = false;

  // This dictionary is in the following format - answerID:vote
  // Example:
  // 5d1ea3de81e1ef53f657baf7: 1 this means that the answer has been given an upvote
  // 5d1ea3de81e1ef53f657baf7: -1 is a downvote
  // 5d1ea3de81e1ef53f657baf7: 0 is no vote, only for when the user cancels a vote.
  votedAnswers: any = {};

  constructor(
    public questionService: QuestionService,
    public activatedRoute: ActivatedRoute,
    public authService: IQAuthService,
    public userService: UserService,
    public answerService: AnswerService,
    public flashMsg: FlashMessagesService,
    public router: Router,
    public debug: DebugService,
    public votesService: VotesService,
    public titleService: Title,
    public metaService: Meta
  ) { }

  ngOnInit() {
    this.setUpComponent();

    this.activatedRoute.url.subscribe(url => {
       this.setUpComponent();
    });
  }

  setUpComponent() {
    this.answerMode = false;
    this.questionURL = this.activatedRoute.snapshot.paramMap.get('id');
    this.questionService.getQuestion(this.questionURL).subscribe(questionData => {
      let qResponse: any = {};
      qResponse = questionData;
      this.question = qResponse.question;
      this.questionID = '' + this.question._id;
      this.questionSuccess = qResponse.success;
      this.questionResponse = qResponse;
      this.debug.log(this.question);
      this.titleService.setTitle(this.question.questionText + ' - Inquantir');

      const keywords = 'Inquantir, Education, ' + this.question.subject;

      this.metaService.addTags([
        {name: 'keywords', content: keywords},
        {name: 'description', content: this.question.previewAnswer ? this.question.previewAnswer.answerText : ''},
        {name: 'robots', content: 'index, follow'}
      ]);

      this.votesService.getVotes(this.question._id, this.userService.getUser().getMongoID()).subscribe(voteData => {
        let vResponse: any = {};
        vResponse = voteData;
        this.debug.log(voteData);
        if (vResponse.votes) {
          vResponse.votes.forEach((vote: Vote) => {
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
      let user: any;
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
      posterID: this.userService.getUser().getMongoID(),
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

  sendEditedAnswer() {
    this.answerService.editAnswer(this.questionID, '' + this.editAnswerID, this.answerText).subscribe(editData => {
      const editResponse: any = editData;
      if (editResponse.success) {
        const foundIndex = this.answers.findIndex(x => '' + x._id === this.editAnswerID);
        this.answers[foundIndex].answerText = this.answerText;

        this.answerText = '';
        this.answerMode = false;
        this.editAnswerID = '';
        this.editMode = false;
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
    this.votesService.sendVote(this.question._id, this.userService.getUser().getMongoID(), answerid, vote).subscribe(data => {
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

  toggleAnswerPreview() {
    this.answerPreview = !this.answerPreview;
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }

  preventFocusLoss(event) {
    event.preventDefault();
  }

  addToAnswerText(text: string) {
    this.answerText += text;
  }

  // FORMATBAR
  formatbarAddToText(text: string) {
    this.answerText += text;
  }

  formatbarBackspace() {
    this.answerText = this.answerText.slice(0, -1);
  }

  editAnswer(answerText: string, answerID: string) {
    this.editAnswerID = '' + answerID;
    this.answerText = answerText;
    this.answerMode = true;
    this.editMode = true;
  }
}
