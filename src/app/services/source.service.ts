import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import * as devRoutes from '../globals/devroutes';
import * as prodRoutes from '../globals/prodroutes';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  routeBase = '';

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.routeBase = devRoutes.routeBase;
    } else {
      this.routeBase = prodRoutes.routeBase;
    }
  }

  getAllSources() {
    let headers = new HttpHeaders();
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get(this.routeBase + '/sources/', {headers})
      .pipe(map(res => res));
  }

  addNewSource(name: string) {
    let headers = new HttpHeaders();
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.routeBase + '/sources/add', {name}, {headers})
      .pipe(map(res => res));
  }

  getQuestionsFromSource(sourceId: string) {
    let headers = new HttpHeaders();
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get(this.routeBase + '/sources/' + sourceId + '/questions', {headers})
      .pipe(map(res => res));
  }

  getQuestionsFromSourceByName(sourceName: string) {
    let urlText = '';
    const specialChars = '!@#$%^&*()>< \'';

    for (let i = 0; i < sourceName.length; i++) {
      if (specialChars.indexOf(sourceName[i]) > -1) {
        urlText += '-';
      } else if (sourceName[i] === '?') {

      } else {
        urlText += sourceName[i];
      }
    }

    const totalUrl = this.routeBase + '/sources/url/' + urlText + '/questions';
    console.log(totalUrl)

    let headers = new HttpHeaders();
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get(totalUrl, {headers})
      .pipe(map(res => res));
  }
}
