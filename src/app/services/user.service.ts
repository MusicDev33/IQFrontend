import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelper } from 'angular2-jwt';
import * as devRoutes from '../globals/devroutes';
import * as prodRoutes from '../globals/prodroutes';

import { User } from '@classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken: any;
  user: User;
  tsRouteBase = '';

  headersTemplate = new HttpHeaders();

  constructor(
    private http: HttpClient) {
      if (isDevMode()) {
        this.tsRouteBase = devRoutes.tsRouteBase;
      } else {
        this.tsRouteBase = prodRoutes.tsRouteBase;
      }

      this.headersTemplate = this.headersTemplate.set('Content-Type', 'application/json');
      this.headersTemplate = this.headersTemplate.set('IQ-User-Agent', 'IQAPIv1');
    }

    getUser(): User {
      let user: User;
      const jwtHelper: JwtHelper = new JwtHelper();
      user = Object.assign(new User(), jwtHelper.decodeToken(localStorage.getItem('id_token')) );
      return user;
    }

    getToken() {
      return localStorage.getItem('id_token');
    }

    userMongoID() {
      // returns the ObjectId in string form.
      // for whatever reason, .str and .toString() didn't work.
      return '' + this.getUser()._id;
    }

    getUserByURLParam(param: string, paramValue: string) {
      let headers = this.headersTemplate;
      headers = headers.set('Authorization', this.getToken());
      return this.http.get(this.tsRouteBase + '/users/param/' + param + '/' + paramValue, {headers})
        .pipe(map(res => res));
    }

    publicGetUserByHandle(handle: string) {
      const headers = this.headersTemplate;
      return this.http.get(this.tsRouteBase + '/users/public/handle/' + handle, {headers})
        .pipe(map(res => res));
    }

    getProfile() {
      let headers = this.headersTemplate;
      headers = headers.set('Authorization', this.getToken());
      return this.http.get(this.tsRouteBase + '/users/profile', {headers})
        .pipe(map(res => res));
    }

    getFeed() {
      const route = this.tsRouteBase + '/feed/' + this.userMongoID();
      let headers = this.headersTemplate;
      headers = headers.set('Authorization', localStorage.getItem('id_token'));
      return this.http.get(route, {headers})
        .pipe(map(res => res));
    }

    changeUserProperty(propertyName: string, propertyValue: any) {
      const route = this.tsRouteBase + '/users/set/' + this.userMongoID() + '/' + propertyName;
      let headers = this.headersTemplate;
      headers = headers.set('Authorization', localStorage.getItem('id_token'));
      return this.http.post(route, {paramValue: propertyValue}, {headers})
        .pipe(map(res => res));
    }
}
