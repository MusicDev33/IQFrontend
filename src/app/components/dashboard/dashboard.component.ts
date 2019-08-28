import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { SubjectsService } from '../../services/subjects.service';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { DebugService } from '../../services/debug.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  questions: Array<Object>;
  subjects: Array<String>;
  subject: string;

  arrayOfSubjects: Array<String>;

  constructor(
    public authService: AuthService,
    public router: Router,
    public qService: QuestionService,
    public activatedRoute: ActivatedRoute,
    public debug: DebugService,
    public subjectsService: SubjectsService) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get('subject')) {
      this.subject = this.activatedRoute.snapshot.paramMap.get('subject');
      this.qService.getSubjectQuestions(this.subject).subscribe(data => {
        var res: any = {};
        res = data;
        this.debug.log(res);
        this.questions = res.questions;
      }, err => {
        this.debug.log(err);
        return false;
      })
    } else {
      this.subject = '';
      this.qService.getAllQuestions().subscribe(data => {
        var res: any = {};
        res = data;
        this.debug.log(res);
        this.questions = res.questions;
      }, err => {
        this.debug.log(err);
        return false
      })
    }

    var response: any = {};
    this.authService.getProfile().subscribe(data => {
      response = data;
      this.user = response.user;
      this.subjects = this.user.currentSubjects;
      this.debug.log(this.user);
    }, err => {
      this.debug.log(err);
      return false;
    });

    this.subjectsService.getAllSubjects().subscribe(data => {
      var response: any = {};
      response = data;
      this.arrayOfSubjects = response.subjects;
    })
  }

  subjectClicked(subject: string) {
    let subjectURL = '';
    if (!this.activatedRoute.snapshot.paramMap.get('subject')) {
      subjectURL = '/dashboard/' + subject;
      this.router.navigate([subjectURL]);
    } else {
      this.subject = subject;
      subjectURL = '/dashboard/' + subject;
      this.router.navigate([subjectURL]);
      this.qService.getSubjectQuestions(subject).subscribe(data => {
        let res: any = {};
        res = data;
        this.debug.log(res);
        this.questions = res.questions;
      }, err => {
        this.debug.log(err);
        return false;
      });
    }
  }

  questionClicked(text) {
    const questionURL = this.qService.questionTextToURL(text);
    this.debug.log(questionURL);
    const routeURL = '/question/' + questionURL;
    this.router.navigate([routeURL]);
  }

  followButtonClicked(subject) {
    this.authService.followSubject(subject.subjectURL).subscribe(data => {
      this.subjects.push(subject.name);
    });
  }

  nSubjects(n) {
    return this.arrayOfSubjects.slice(0, n);
  }
}
