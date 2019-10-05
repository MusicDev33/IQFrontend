import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';
import * as devRoutes from '../globals/devroutes';
import * as prodRoutes from '../globals/prodroutes';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  routeBase = '';
  headersTemplate = new HttpHeaders();

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.routeBase = devRoutes.routeBase;
    } else {
      this.routeBase = prodRoutes.routeBase;
    }

    this.headersTemplate = this.headersTemplate.set('Content-Type', 'application/json');
    this.headersTemplate = this.headersTemplate.set('IQ-User-Agent', 'IQAPIv1');
  }

  questionTextToURL(questionText) {
    let urlText = '';
    const specialChars = '!@#$%^&*()>< \'/\\';

    for (var i = 0; i < questionText.length; i++) {
      if (specialChars.indexOf(questionText[i]) > -1) {
        urlText += '-';
      } else if (questionText[i] === '?') {

      } else {
        urlText += questionText[i];
      }
    }
    return urlText;
  }

  askQuestion(question) {
    const headers = this.headersTemplate;
    return this.http.post(this.routeBase + '/questions/add', question, {headers})
      .pipe(map(res => res));
  }

  getQuestion(questionURL) {
    const headers = this.headersTemplate;
    return this.http.get(this.routeBase + '/questions/' + questionURL, {headers})
      .pipe(map(res => res));
  }

  getAllQuestions() {
    const headers = this.headersTemplate;
    return this.http.get(this.routeBase + '/questions', {headers})
      .pipe(map(res => res));
  }

  getSubjectQuestions(subject: string) {
    const headers = this.headersTemplate;
    return this.http.get(this.routeBase + '/subjects/' + subject + '/questions', {headers})
      .pipe(map(res => res));
  }

  getUserQuestions(userID) {
    const headers = this.headersTemplate;
    return this.http.get(this.routeBase + '/users/' + userID + '/questions', {headers})
      .pipe(map(res => res));
  }
}
