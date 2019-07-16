import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Http, Headers } from '@angular/http'
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt'
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  constructor(private http: HttpClient) { }

  sendVote(questionid: string, userid: string, answerid: string, vote: Number){
    var votes = vote.toString()
    var urlString = 'https://inquantir.com/api/v1/questions/' + questionid + "/" + userid + "/" + answerid + "/votes/" + votes
    let headers = new HttpHeaders().append('Authorization', localStorage.getItem('id_token')).append('Content-Type', 'application/json');
    return this.http.post(urlString, {headers: headers})
      .pipe(map(res => res));
  }
}
