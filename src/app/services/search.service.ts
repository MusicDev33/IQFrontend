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

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.routeBase = devRoutes.routeBase;
    } else {
      this.routeBase = prodRoutes.routeBase;
    }
  }

  subjectSearch(searchTerm) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    return this.http.get(this.routeBase + '/subjects/search/' + searchTerm, {headers: headers})
      .pipe(map(res => res));
  }

  sourceSearch(searchTerm) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    return this.http.get(this.routeBase + '/sources/search/' + searchTerm, {headers: headers})
      .pipe(map(res => res));
  }
}
