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

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.routeBase = devRoutes.routeBase;
    } else {
      this.routeBase = prodRoutes.routeBase;
    }
  }

  questionTextToURL(questionText) {
    let urlText = '';
    const specialChars = '!@#$%^&*()>< \'';

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
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    return this.http.post(this.routeBase + '/questions/add', question, {headers: headers})
      .pipe(map(res => res));
  }

  getQuestion(questionURL) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    return this.http.get(this.routeBase + '/questions/' + questionURL, {headers: headers})
      .pipe(map(res => res));
  }

  getAllQuestions() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    return this.http.get(this.routeBase + '/questions', {headers: headers})
      .pipe(map(res => res));
  }

  getSubjectQuestions(subject: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    return this.http.get(this.routeBase + '/subjects/' + subject + '/questions', {headers: headers})
      .pipe(map(res => res));
  }

  getUserQuestions(userID) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    return this.http.get(this.routeBase + '/users/' + userID + '/questions', {headers: headers})
      .pipe(map(res => res));
  }
}
