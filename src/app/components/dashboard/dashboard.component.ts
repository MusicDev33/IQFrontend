import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { QuestionService } from '../../services/question.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Object
  questions: Array<Object>
  topics: Array<String>

  constructor(
    private authService: AuthService,
    private router: Router,
    private qService: QuestionService) { }

  ngOnInit() {
    this.topics = ["Physics", "Chemistry", "Biology", "Psychology"]

    var response: any = {}
    this.authService.getProfile().subscribe(data => {
      response = data;
      this.user = response.user
    }, err => {
      console.log(err);
      return false;
    })

    this.qService.getAllQuestions().subscribe(data => {
      var res: any = {}
      res = data
      console.log(res)
      this.questions = res.questions
    }, err => {
      console.log(err);
      return false
    })
  }

  questionClicked(text){
    var questionURL = this.qService.questionTextToURL(text)
    console.log(questionURL)
    var routeURL = '/question/' + questionURL
    this.router.navigate([routeURL])
  }
}
