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
export class VotesService {
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

  sendVote(questionid: string, userid: string, answerid: string, vote: number) {
    let headers = this.headersTemplate;
    headers = headers.set('Authorization', localStorage.getItem('id_token'));
    const votes = vote.toString();
    const urlString = this.routeBase + '/questions/' + questionid + '/' + userid + '/' + answerid + '/votes/' + votes;
    return this.http.post(urlString, {headers})
      .pipe(map(res => res));
  }

  getVotes(questionid: string, userid: string) {
    let headers = this.headersTemplate;
    headers = headers.set('Authorization', localStorage.getItem('id_token'));
    const urlString = this.routeBase + '/questions/' + questionid + '/answers/votes/' + userid;
    return this.http.get(urlString, {headers})
      .pipe(map(res => res));
  }
}
