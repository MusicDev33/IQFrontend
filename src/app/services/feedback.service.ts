import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as devRoutes from '../globals/devroutes';
import * as prodRoutes from '../globals/prodroutes';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  routeBase = '';
  tsRouteBase = '';

  headersTemplate = new HttpHeaders();

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.routeBase = devRoutes.routeBase;
      this.tsRouteBase = devRoutes.tsRouteBase;
    } else {
      this.routeBase = prodRoutes.routeBase;
      this.tsRouteBase = prodRoutes.tsRouteBase;
    }

    this.headersTemplate = this.headersTemplate.set('Content-Type', 'application/json');
    this.headersTemplate = this.headersTemplate.set('IQ-User-Agent', 'IQAPIv1');
  }

  sendFeedback(feedback: any) {
    let headers = this.headersTemplate;
    headers = headers.set('Authorization', localStorage.getItem('id_token'));
    return this.http.post(this.tsRouteBase + '/feedback/add', feedback, {headers})
      .pipe(map(res => res));
  }
}
