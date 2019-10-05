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
export class UserService {
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

    getUser() {
      const jwtHelper: JwtHelper = new JwtHelper();
      return jwtHelper.decodeToken(localStorage.getItem('id_token'));
    }

    getToken() {
      return localStorage.getItem('id_token');
    }

    userMongoID() {
      // returns the ObjectId in string form.
      // for whatever reason, .str and .toString() didn't work.
      return '' + this.getUser()._id;
    }

    getProfile() {
      let headers = new HttpHeaders().append('Authorization', this.getToken()).append('Content-Type', 'application/json');
      headers = headers.set('IQ-User-Agent', 'IQAPIv1');
      return this.http.get(this.routeBase + '/users/profile', {headers})
        .pipe(map(res => res));
    }

    getUserByHandle(handle) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('IQ-User-Agent', 'IQAPIv1');
      return this.http.get(this.routeBase + '/users/profile/' + handle, {headers})
        .pipe(map(res => res));
    }

    getFeed() {
      const route = this.routeBase + '/feed/' + this.userMongoID();
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers = headers.set('IQ-User-Agent', 'IQAPIv1');
      return this.http.get(route, {headers})
        .pipe(map(res => res));
    }

    addSourceToUser(sourceName: string) {
      const route = this.routeBase + '/users/' + this.userMongoID() + '/sources/' + sourceName;
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers = headers.set('IQ-User-Agent', 'IQAPIv1');
      return this.http.post(route, {}, {headers})
        .pipe(map(res => res));
    }

    removeSourceFromUser(sourceName: string) {
      const route = this.routeBase + '/users/' + this.userMongoID() + '/sources/' + sourceName;
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers = headers.set('IQ-User-Agent', 'IQAPIv1');
      return this.http.post(route, {}, {headers})
        .pipe(map(res => res));
    }

    followSubject(subjectURL) {
      const route = this.routeBase + '/users/' + this.userMongoID() + '/subjects/' + subjectURL;
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers = headers.set('IQ-User-Agent', 'IQAPIv1');
      return this.http.post(route, {}, {headers})
        .pipe(map(res => res));
    }

    addKnowledge(subjectURL: string) {
      const route = this.routeBase + '/users/' + this.userMongoID() + '/knowledge/' + subjectURL;
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers = headers.set('IQ-User-Agent', 'IQAPIv1');
      return this.http.post(route, {}, {headers})
        .pipe(map(res => res));
    }

    deleteKnowledge(subjectURL: string) {
      const route = this.routeBase + '/users/' + this.userMongoID() + '/knowledge/' + subjectURL;
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers = headers.set('IQ-User-Agent', 'IQAPIv1');
      return this.http.delete(route, {headers})
        .pipe(map(res => res));
    }

    changeBio(bio: string) {
      const route = this.routeBase + '/users/' + this.userMongoID() + '/bio';
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('IQ-User-Agent', 'IQAPIv1');
      // Shorthand...I'm not sure how I feel about it
      return this.http.post(route, {bio}, {headers})
        .pipe(map(res => res));
    }
}
