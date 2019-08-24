import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Http, Headers } from '@angular/http'
import { map } from 'rxjs/operators';
import * as devRoutes from '../globals/devroutes';
import * as prodRoutes from '../globals/prodroutes';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  routeBase = '';

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.routeBase = devRoutes.routeBase
    } else {
      this.routeBase = prodRoutes.routeBase
    }
  }

  getAnswers(questionURL){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.get(this.routeBase + '/questions/'+questionURL+'/answers', {headers: headers})
      .pipe(map(res => res));
  }

  sendAnswer(answer, questionURL){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post(this.routeBase + '/questions/'+questionURL+'/answers/add', answer, {headers: headers})
      .pipe(map(res => res));

  }

  getUserAnswers(userID){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.routeBase + '/users/' + userID + '/answers', {headers: headers})
      .pipe(map(res => res));
  }
}
