import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Http, Headers } from '@angular/http'
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt'
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http: HttpClient) { }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://104.248.68.166:2999/api/v1/users/register', user, {headers: headers})
      .pipe(map(res => res));
  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://104.248.68.166:2999/api/v1/users/authenticate', user, {headers: headers})
      .pipe(map(res => res));
  }

  getProfile(){
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    return this.http.get('http://104.248.68.166:2999/api/v1/users/profile', {headers: headers})
      .pipe(map(res => res));
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user))

    this.authToken = token
    this.user = user
  }

  loadUser(){
    const user = localStorage.getItem('user');
    this.user = user;
  }

  getUser(){
    let jwtHelper: JwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(localStorage.getItem('id_token'));
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getUserID(): any{
    let jwtHelper: JwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(localStorage.getItem('id_token'));
  }

  getUserNameURL(){
    if (this.user){
      var url: String = ""
      for (var i = 0; i < this.user.name.length; i++) {
        if (this.user.name[i] == " " || this.user.name[i] == "'"){
          url += "-"
        }else{
          url += this.user.name[i]
        }
      }
      return url
    }else{
      return "null"
    }
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null
    this.user = null
    localStorage.clear()
  }
}
