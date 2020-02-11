import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as devRoutes from '../globals/devroutes';
import * as prodRoutes from '../globals/prodroutes';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  tsRouteBase = '';

  headersTemplate = new HttpHeaders();

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.tsRouteBase = devRoutes.tsRouteBase;
    } else {
      this.tsRouteBase = prodRoutes.tsRouteBase;
    }

    this.headersTemplate = this.headersTemplate.set('Content-Type', 'application/json');
    this.headersTemplate = this.headersTemplate.set('IQ-User-Agent', 'IQAPIv1');
  }

  getAllSubjects() {
    const headers = this.headersTemplate;
    return this.http.get(this.tsRouteBase + '/subjects/', {headers})
      .pipe(map(res => res));
  }

  addNewSubject(subject: string) {
    subject = subject.replace(/\s+/g, '-').toLowerCase();
    let headers = this.headersTemplate;
    headers = headers.set('Authorization', localStorage.getItem('id_token'));
    return this.http.post(this.tsRouteBase + '/subjects/' + subject, {}, {headers})
      .pipe(map(res => res));
  }

  getSubjectByURL(subjectURL: string) {
    let headers = this.headersTemplate;
    headers = headers.set('Cache-Control', 'max-age=3600');
    return this.http.get(this.tsRouteBase + '/subjects/' + subjectURL, {headers})
      .pipe(map(res => res));
  }
}
