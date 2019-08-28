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

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.routeBase = devRoutes.routeBase;
    } else {
      this.routeBase = prodRoutes.routeBase;
    }
  }

  sendVote(questionid: string, userid: string, answerid: string, vote: Number) {
    const votes = vote.toString();
    const urlString = this.routeBase + '/questions/' + questionid + '/' + userid + '/' + answerid + '/votes/' + votes;
    const headers = new HttpHeaders().append('Authorization', localStorage.getItem('id_token')).append('Content-Type', 'application/json');
    return this.http.post(urlString, {headers: headers})
      .pipe(map(res => res));
  }

  getVotes(questionid: string, userid: string) {
    const urlString = this.routeBase + '/questions/' + questionid + '/answers/votes/' + userid;
    const headers = new HttpHeaders().append('Authorization', localStorage.getItem('id_token')).append('Content-Type', 'application/json');
    return this.http.get(urlString, {headers: headers})
      .pipe(map(res => res));
  }
}
