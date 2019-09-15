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

export class AuthService {
  authToken: any;
  user: any;
  routeBase = '';

  constructor(
    private http: HttpClient) {
      if (isDevMode()) {
        this.routeBase = devRoutes.routeBase;
      } else {
        this.routeBase = prodRoutes.routeBase;
      }
    }

  registerUser(user) {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    return this.http.post(this.routeBase + '/users/register', user, {headers: headers})
      .pipe(map(res => res));
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    console.log(headers)
    return this.http.post(this.routeBase + '/users/authenticate', user, {headers: headers})
      .pipe(map(res => res));
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    return this.http.get(this.routeBase + '/users/profile', {headers: headers})
      .pipe(map(res => res));
  }

  getUserByHandle(handle) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    return this.http.get(this.routeBase + '/users/profile/' + handle, {headers: headers})
      .pipe(map(res => res));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  loadUser() {
    const jwtHelper: JwtHelper = new JwtHelper();
    this.user = jwtHelper.decodeToken(localStorage.getItem('id_token'));
  }

  userMongoID() {
    const jwtHelper: JwtHelper = new JwtHelper();
    this.user = jwtHelper.decodeToken(localStorage.getItem('id_token'));
    // returns the ObjectId in string form.
    // for whatever reason, .str and .toString() didn't work.
    return '' + this.user._id;
  }

  getUser() {
    const jwtHelper: JwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(localStorage.getItem('id_token'));
  }

  getUserHandle() {
    const jwtHelper: JwtHelper = new JwtHelper();
    this.user = jwtHelper.decodeToken(localStorage.getItem('id_token'));
    return this.user.handle;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  hasToken() {
    const jwtHelper: JwtHelper = new JwtHelper();

    if (localStorage.getItem('id_token')) {
      if (this.loggedIn()) {
        return true;
      } else {
        this.logout();
        return false;
      }
    } else {
      this.logout();
      return false;
    }
  }

  getUserID(): any {
    const jwtHelper: JwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(localStorage.getItem('id_token'));
  }

  getUserNameURL() {
    this.loadUser();
    if (this.user) {
      let url: String = '';
      for (var i = 0; i < this.user.name.length; i++) {
        if (this.user.name[i] === ' ' || this.user.name[i] === '\'') {
          url += '-';
        } else {
          url += this.user.name[i];
        }
      }
      return url;
    } else {
      return 'null';
    }
  }

  followSubject(subjectURL) {
    const route = this.routeBase + '/users/' + this.userMongoID() + '/subjects/' + subjectURL;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    return this.http.post(route, {}, {headers: headers})
      .pipe(map(res => res));
  }

  addKnowledge(subjectURL: string) {
    const route = this.routeBase + '/users/' + this.userMongoID() + '/knowledge/' + subjectURL;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    return this.http.post(route, {}, {headers: headers})
      .pipe(map(res => res));
  }

  deleteKnowledge(subjectURL: string) {
    const route = this.routeBase + '/users/' + this.userMongoID() + '/knowledge/' + subjectURL;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    return this.http.delete(route, {headers: headers})
      .pipe(map(res => res));
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
