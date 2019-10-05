import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import * as devRoutes from '../globals/devroutes';
import * as prodRoutes from '../globals/prodroutes';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
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

  subjectSearch(searchTerm) {
    const headers = this.headersTemplate;
    return this.http.get(this.routeBase + '/subjects/search/' + searchTerm, {headers})
      .pipe(map(res => res));
  }

  sourceSearch(searchTerm) {
    const headers = this.headersTemplate;
    return this.http.get(this.routeBase + '/sources/search/' + searchTerm, {headers})
      .pipe(map(res => res));
  }
}
