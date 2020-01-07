import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as devRoutes from '../globals/devroutes';
import * as prodRoutes from '../globals/prodroutes';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
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

  getAnswers(questionID: string) {
    const headers = this.headersTemplate;
    return this.http.get(this.tsRouteBase + '/questions/' + questionID + '/answers', {headers})
      .pipe(map(res => res));
  }

  sendAnswer(answer, questionID: string) {
    let headers = this.headersTemplate;
    headers = headers.set('Authorization', localStorage.getItem('id_token'));
    return this.http.post(this.tsRouteBase + '/questions/' + questionID + '/answers/add', answer, {headers})
      .pipe(map(res => res));

  }

  getUserAnswers(userID: string) {
    const headers = this.headersTemplate;
    return this.http.get(this.tsRouteBase + '/users/' + userID + '/answers', {headers})
      .pipe(map(res => res));
  }

  deleteAnswer(questionID: string, answerID: string) {
    let headers = this.headersTemplate;
    headers = headers.set('Authorization', localStorage.getItem('id_token'));
    const endpoint = this.tsRouteBase + '/questions/' + questionID + '/answers/' + answerID;
    return this.http.delete(endpoint, {headers}).pipe(map(res => res));
  }

  editAnswer(questionID: string, answerID: string, newText: string) {
    let headers = this.headersTemplate;
    headers = headers.set('Authorization', localStorage.getItem('id_token'));
    const sendObject = {
      newText
    };
    const endpoint = this.tsRouteBase + '/questions/' + questionID + '/answers/' + answerID;
    return this.http.put(endpoint, sendObject, {headers}).pipe(map(res => res));
  }
}
