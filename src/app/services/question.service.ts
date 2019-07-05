import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Http, Headers } from '@angular/http'
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt'
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  questionTextToURL(questionText){
    var urlText = ""
    var questionText = questionText
    var specialChars = "!@#$%^&*()>< '"

    for (var i = 0; i < questionText.length; i++) {
      if (specialChars.indexOf(questionText[i]) > -1){
        urlText += "-"
      }else if (questionText[i] == "?"){

      }else{
        urlText += questionText[i]
      }
    }
    return urlText
  }

  askQuestion(question){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://104.248.68.166:2999/api/v1/questions/add', question, {headers: headers})
      .pipe(map(res => res));
  }

  getQuestion(questionURL){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.get('http://104.248.68.166:2999/api/v1/questions/'+questionURL, {headers: headers})
      .pipe(map(res => res));
  }

  getAllQuestions(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.get('http://104.248.68.166:2999/api/v1/questions', {headers: headers})
      .pipe(map(res => res));
  }

  getSubjectQuestions(subject: string){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.get('http://104.248.68.166:2999/api/v1/subjects/' + subject + "/questions", {headers: headers})
      .pipe(map(res => res));
  }

  getUserQuestions(userID){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://104.248.68.166:2999/api/v1/users/' + userID + '/questions', {headers: headers})
      .pipe(map(res => res));
  }
}
