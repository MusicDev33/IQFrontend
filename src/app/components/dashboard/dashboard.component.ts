import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { QuestionService } from '../../services/question.service'
import { ActivatedRoute } from '@angular/router';
import { DebugService } from  '../../services/debug.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any
  questions: Array<Object>
  subjects: Array<String>
  subject: string

  constructor(
    public authService: AuthService,
    public router: Router,
    public qService: QuestionService,
    public activatedRoute: ActivatedRoute,
    public debug: DebugService) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get('subject')){
      this.subject = this.activatedRoute.snapshot.paramMap.get('subject');
      this.qService.getSubjectQuestions(this.subject).subscribe(data => {
        var res: any = {}
        res = data
        this.debug.log(res)
        this.questions = res.questions
      }, err => {
        this.debug.log(err);
        return false
      })
    }else{
      this.subject = ""
      this.qService.getAllQuestions().subscribe(data => {
        var res: any = {}
        res = data
        this.debug.log(res)
        this.questions = res.questions
      }, err => {
        this.debug.log(err);
        return false
      })
    }

    var response: any = {}
    this.authService.getProfile().subscribe(data => {
      response = data;
      this.user = response.user
      this.subjects = this.user.currentSubjects
      this.debug.log(this.user)
    }, err => {
      this.debug.log(err);
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
        this.debug.log(res)
        this.questions = res.questions
      }, err => {
        this.debug.log(err);
        return false
      })
    }
  }

  questionClicked(text){
    var questionURL = this.qService.questionTextToURL(text)
    this.debug.log(questionURL)
    var routeURL = '/question/' + questionURL
    this.router.navigate([routeURL])
  }
}
