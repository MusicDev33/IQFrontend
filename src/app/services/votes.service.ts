import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as devRoutes from '../globals/devroutes';
import * as prodRoutes from '../globals/prodroutes';

@Injectable({
  providedIn: 'root'
})
export class VotesService {
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

  sendVote(questionid: string, userid: string, answerid: string, vote: number) {
    let headers = this.headersTemplate;
    headers = headers.set('Authorization', localStorage.getItem('id_token'));
    const urlString = this.tsRouteBase + '/questions/' + questionid + '/' + userid + '/' + answerid + '/vote';
    return this.http.post(urlString, {vote}, {headers})
      .pipe(map(res => res));
  }

  getVotes(questionid: string, userid: string) {
    let headers = this.headersTemplate;
    headers = headers.set('Authorization', localStorage.getItem('id_token'));
    const urlString = this.tsRouteBase + '/questions/' + questionid + '/answers/' + userid + '/votes';
    return this.http.get(urlString, {headers})
      .pipe(map(res => res));
  }
}
