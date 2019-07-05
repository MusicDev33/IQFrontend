import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { QuestionService } from '../../services/question.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any
  questions: Array<Object>
  topics: Array<String>
  subject: string

  constructor(
    public authService: AuthService,
    public router: Router,
    public qService: QuestionService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get('subject')){
      this.subject = this.activatedRoute.snapshot.paramMap.get('subject');
      this.qService.getSubjectQuestions(this.subject).subscribe(data => {
        var res: any = {}
        res = data
        console.log(res)
        this.questions = res.questions
      }, err => {
        console.log(err);
        return false
      })
    }else{
      this.subject = ""
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

    var response: any = {}
    this.authService.getProfile().subscribe(data => {
      response = data;
      this.user = response.user
      this.topics = this.user.currentSubjects
      console.log(this.user)
    }, err => {
      console.log(err);
      return false;
    })
  }

  subjectClicked(subject: string){
    if (!this.activatedRoute.snapshot.paramMap.get('subject')){
      var subjectURL = "/dashboard/" + subject
      this.router.navigate([subjectURL])
    }else{
      this.subject = subject
      var subjectURL = "/dashboard/" + subject
      this.router.navigate([subjectURL])
      this.qService.getSubjectQuestions(subject).subscribe(data => {
        var res: any = {}
        res = data
        console.log(res)
        this.questions = res.questions
      }, err => {
        console.log(err);
        return false
      })
    }
  }

  questionClicked(text){
    var questionURL = this.qService.questionTextToURL(text)
    console.log(questionURL)
    var routeURL = '/question/' + questionURL
    this.router.navigate([routeURL])
  }
}
