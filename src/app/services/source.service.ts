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

  addNewSource(name: string, edition: string) {
    let headers = new HttpHeaders();
    headers = headers.set('IQ-User-Agent', 'IQAPIv1');
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.routeBase + '/sources/add', {name, edition}, {headers})
      .pipe(map(res => res));
  }
}
