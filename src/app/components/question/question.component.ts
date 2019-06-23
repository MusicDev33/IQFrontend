import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { AnswerService } from '../../services/answer.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'

interface Answer {
  answerText: String,
  votes: number,
  poster: String,
  views: number,
  comments: Array<Object>,
  questionURL: String,
  posterID: String
}

interface user {
  name: String,
  _id: String
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question: object
  answers: Array<Answer>
  questionURL: String
  answerText: String
  hasAnswered: boolean
  userHasAnswered: boolean

  constructor(
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private answerService: AnswerService,
    private flashMsg: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.questionURL = this.activatedRoute.snapshot.paramMap.get('id');
    var response: any = {}
    this.questionService.getQuestion(this.questionURL).subscribe(data => {
      response = data;
      this.question = response.question
    }, err => {
      console.log(err);
      return false;
    })

    this.answerService.getAnswers(this.questionURL).subscribe(data => {
      var response: any = {}
      var user: user
      response = data
      this.answers = response.answers

      user = this.authService.getUserID()

      this.answers.forEach( (answer) => {
        if (answer.poster == user.name){
          this.userHasAnswered = true
        }
      })
    })
  }

  sendAnswer(form: NgForm){
    var answer = {
      answerText: this.answerText,
      poster: this.authService.getUser().name,
      posterID: this.authService.userMongoID(),
      votes: 0,
      questionURL: this.questionURL,
      views: 1,
      comments: []
    }
    console.log(answer)
    this.answerService.sendAnswer(answer, this.questionURL).subscribe(data => {
      var response: any = {}
      response = data
      if (response.success){
        this.flashMsg.show("Answer added.", {cssClass: 'alert-success', timeout: 1500})
        form.reset();
      }else{
        this.flashMsg.show("Something went wrong. Try answering again.", {cssClass: 'alert-danger', timeout: 1500})
      }
    })
  }

}
