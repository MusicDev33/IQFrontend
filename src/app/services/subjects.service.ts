import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import * as devRoutes from '../globals/devroutes';
import * as prodRoutes from '../globals/prodroutes';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

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

  getAllSubjects() {
    const headers = this.headersTemplate;
    return this.http.get(this.routeBase + '/subjects/', {headers})
      .pipe(map(res => res));
  }

  addNewSubject(subject: string) {
    subject = subject.replace(/\s+/g, '-').toLowerCase();
    const headers = this.headersTemplate;
    return this.http.post(this.routeBase + '/subjects/' + subject, {}, {headers})
      .pipe(map(res => res));
  }
}
