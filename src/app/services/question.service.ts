import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as devRoutes from '../globals/devroutes';
import * as prodRoutes from '../globals/prodroutes';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  tsRouteBase = '';
  headersTemplate = new HttpHeaders();

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.tsRouteBase = devRoutes.tsRouteBase;
    } else {
      this.tsRouteBase = prodRoutes.tsRouteBase;
    }

    this.headersTemplate = this.headersTemplate.set('Content-Type', 'application/json');
    this.headersTemplate = this.headersTemplate.set('IQ-User-Agent', 'IQAPIv1');
  }

  questionTextToURL(questionText: string): string {
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

  askQuestion(question: any) {
    let headers = this.headersTemplate;
    headers = headers.set('Authorization', localStorage.getItem('id_token'));
    return this.http.post(this.tsRouteBase + '/questions/add', question, {headers})
      .pipe(map(res => res));
  }

  getQuestion(questionURL: string) {
    const headers = this.headersTemplate;
    return this.http.get(this.tsRouteBase + '/questions/param/urlText/' + questionURL, {headers})
      .pipe(map(res => res));
  }

  getAllQuestions() {
    const headers = this.headersTemplate;
    return this.http.get(this.tsRouteBase + '/questions', {headers})
      .pipe(map(res => res));
  }

  getSubjectQuestions(subject: string) {
    const headers = this.headersTemplate;
    return this.http.get(this.tsRouteBase + '/subjects/' + subject + '/questions', {headers})
      .pipe(map(res => res));
  }

  getUserQuestions(userID: string) {
    const headers = this.headersTemplate;
    return this.http.get(this.tsRouteBase + '/questions/params/askerID/' + userID, {headers})
      .pipe(map(res => res));
  }

  // Edit Question
  editQuestionTags(question: any) {
    let headers = this.headersTemplate;
    headers = headers.set('Authorization', localStorage.getItem('id_token'));
    const body = {
      paramValue: question.tags
    };
    return this.http.put(this.tsRouteBase + '/questions/set/' + question._id + '/tags', body, {headers})
      .pipe(map(res => res));
  }

  editQuestionSource(question: any) {
    let headers = this.headersTemplate;
    headers = headers.set('Authorization', localStorage.getItem('id_token'));
    const body = {
      paramValue: question.homeworkSource
    };
    return this.http.put(this.tsRouteBase + '/questions/set/' + question._id + '/homeworkSource', body, {headers})
      .pipe(map(res => res));
  }
}
