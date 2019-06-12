import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Http, Headers } from '@angular/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  getAnswers(questionURL){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.get('http://104.248.68.166:2999/api/v1/questions/'+questionURL+'/answers', {headers: headers})
      .pipe(map(res => res));
  }

  sendAnswer(answer, questionURL){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://104.248.68.166:2999/api/v1/questions/'+questionURL+'/answers/add', answer, {headers: headers})
      .pipe(map(res => res));

  }
}
