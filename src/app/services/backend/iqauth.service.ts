import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';
import * as devRoutes from '../../globals/devroutes';
import * as prodRoutes from '../../globals/prodroutes';

@Injectable({
  providedIn: 'root'
})

export class IQAuthService {
  authToken: any;
  user: any;
  routeBase = '';
  tsRouteBase = '';

  tempGoogleID = '';
  tempUser = {
    handle: '',
    email: '',
    name: '',
    photoUrl: '',
    googleID: ''
  };

  headersTemplate = new HttpHeaders();

  constructor(
    private http: HttpClient) {
      if (isDevMode()) {
        this.routeBase = devRoutes.routeBase;
        this.tsRouteBase = devRoutes.tsRouteBase;
      } else {
        this.routeBase = prodRoutes.routeBase;
      }

      this.headersTemplate = this.headersTemplate.set('Content-Type', 'application/json');
      this.headersTemplate = this.headersTemplate.set('IQ-User-Agent', 'IQAPIv1');
    }

  registerUser(user) {
    const headers = this.headersTemplate;
    return this.http.post(this.tsRouteBase + '/users/register', user, {headers})
      .pipe(map(res => res));
  }

  registerUserWithGoogle(user: any) {
    const headers = this.headersTemplate;
    return this.http.post(this.tsRouteBase + '/users/g/register', user, {headers})
      .pipe(map(res => res));
  }

  authenticateUser(user) {
    const headers = this.headersTemplate;
    return this.http.post(this.tsRouteBase + '/users/authenticate', user, {headers})
      .pipe(map(res => res));
  }

  authUserGoogle(googleID: string) {
    const headers = this.headersTemplate;
    const body = { googleID };
    return this.http.post(this.tsRouteBase + '/users/g/authenticate', body, {headers})
      .pipe(map(res => res));
  }

  // Deprecated for now
  // addGoogleIDToUser(userid: string, googleID: string) {
  //   const headers = this.headersTemplate;
  //   const body = { googleID };
  //   return this.http.put(this.routeBase + '/users/' + userid + '/googleid/add', body, {headers})
  //     .pipe(map(res => res));
  // }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  setTempGoogleID(googleID: string) {
    this.tempGoogleID = googleID;
  }

  getTempGoogleID() {
    return this.tempGoogleID;
  }

  deleteTempGoogleID() {
    this.tempGoogleID = '';
  }

  setTempUser(user: any) {
    this.tempUser = user;
  }

  setTempUserHandle(handle: string) {
    this.tempUser.handle = handle;
  }

  getTempUser() {
    return this.tempUser;
  }

  deleteTempUser() {
    this.tempUser = {
      handle: '',
      email: '',
      name: '',
      photoUrl: '',
      googleID: ''
    };
  }

  hasToken() {
    const jwtHelper: JwtHelper = new JwtHelper();

    if (localStorage.getItem('id_token')) {
      if (!this.loggedIn()) {
        this.logout();
      }
      return this.loggedIn();
    } else {
      this.logout();
      return false;
    }
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
