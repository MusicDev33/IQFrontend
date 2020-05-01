import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as devRoutes from '@globals/devroutes';
import * as prodRoutes from '@globals/prodroutes';
import { Observable } from 'rxjs';

import { IQuestion } from '@interfaces/schemas/IQuestion';
import { ISubject } from '@interfaces/schemas/ISubject';
import { ISource } from '@interfaces/schemas/ISource';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
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

  subjectSearch(searchTerm: string): Observable<any> {
    const headers = this.headersTemplate;
    // Turn spaces into dashes
    let sanitizedSearch = searchTerm.trim().replace(/[ ]+/ig, '-');
    // Get rid of special characters
    sanitizedSearch = sanitizedSearch.replace(/[?:;'",.!@#^&*()_]+/ig, '');
    return this.http.get(this.tsRouteBase + '/search/subjects/' + sanitizedSearch, {headers})
      .pipe(map(res => res));
  }

  sourceSearch(searchTerm: string): Observable<any> {
    const headers = this.headersTemplate;
    // Turn spaces into dashes
    let sanitizedSearch = searchTerm.trim().replace(/[ ]+/ig, '-');
    // Get rid of special characters
    sanitizedSearch = sanitizedSearch.replace(/[?:;'",.!@#^&*()_]+/ig, '');
    return this.http.get(this.tsRouteBase + '/search/sources/' + sanitizedSearch, {headers})
      .pipe(map(res => res));
  }

  questionSearch(searchTerm: string): Observable<any> {
    const headers = this.headersTemplate;
    // Turn spaces into dashes
    let sanitizedSearch = searchTerm.trim().replace(/[ ]+/ig, '-');
    // Get rid of special characters
    sanitizedSearch = sanitizedSearch.replace(/[?:;'",.!@#^&*()_]+/ig, '');
    return this.http.get(this.tsRouteBase + '/search/questions/' + sanitizedSearch, {headers})
      .pipe(map(res => res));
  }

  // This is for the typeahead, it needs the observable so we have to
  // do things a little differently
  searchEverythingTypeahead(searchTerm: string): Observable<any> {
    const headers = this.headersTemplate;
    // Turn spaces into dashes
    let sanitizedSearch = searchTerm.trim().replace(/[ ]+/ig, '-');
    // Get rid of special characters
    sanitizedSearch = sanitizedSearch.replace(/[?:;'",.!@#^&*()_]+/ig, '');
    return this.http.get(this.tsRouteBase + '/search/everything/' + sanitizedSearch, {headers})
      .pipe(map((res: any) => res.questions.concat(res.sources, res.subjects, res.users) ));
  }
}
