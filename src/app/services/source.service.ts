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

  headersTemplate = new HttpHeaders();

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.routeBase = devRoutes.routeBase;
    } else {
      this.routeBase = prodRoutes.routeBase;
    }

    this.headersTemplate = this.headersTemplate.set('Content-Type', 'application/json');
    this.headersTemplate = this.headersTemplate.set('IQ-User-Agent', 'IQAPIv1');
  }

  getAllSources() {
    const headers = this.headersTemplate;
    return this.http.get(this.routeBase + '/sources/', {headers})
      .pipe(map(res => res));
  }

  addNewSource(name: string) {
    let headers = this.headersTemplate;
    headers = headers.set('Authorization', localStorage.getItem('id_token'));
    return this.http.post(this.routeBase + '/sources/add', {name}, {headers})
      .pipe(map(res => res));
  }

  getQuestionsFromSource(sourceId: string) {
    const headers = this.headersTemplate;
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

    const headers = this.headersTemplate;
    return this.http.get(totalUrl, {headers})
      .pipe(map(res => res));
  }

  getSourceByName(sourceName: string) {
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

    const headers = this.headersTemplate;
    return this.http.get(this.routeBase + '/sources/name/' + urlText, {headers})
      .pipe(map(res => res));
  }

  addTag(tagName: string, sourceId: string) {
    let tagUrl = '';
    const specialChars = '!@#$%^&*()>< \'';

    for (let i = 0; i < tagName.length; i++) {
      if (specialChars.indexOf(tagName[i]) > -1) {
        tagUrl += '-';
      } else if (tagName[i] === '?') {

      } else {
        tagUrl += tagName[i];
      }
    }

    let headers = this.headersTemplate;
    headers = headers.set('Authorization', localStorage.getItem('id_token'));
    return this.http.post(this.routeBase + '/sources/' + sourceId + '/tags/' + tagUrl, {}, {headers})
      .pipe(map(res => res));
  }
}
