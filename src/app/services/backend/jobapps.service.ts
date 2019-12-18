import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHeaders } from '@globals/routeheaders';
import { map } from 'rxjs/operators';
import * as devRoutes from '../../globals/devroutes';
import * as prodRoutes from '../../globals/prodroutes';

@Injectable({
  providedIn: 'root'
})
export class JobAppsService {

  headers = BaseHeaders;
  routeBase: string;

  constructor(
    private http: HttpClient) {
      if (isDevMode()) {
        this.routeBase = devRoutes.routeBase;
      } else {
        this.routeBase = prodRoutes.routeBase;
      }
    }

  sendJobApplication(application) {
    return this.http.post(this.routeBase + '/jobs/apply', application, {headers: BaseHeaders})
      .pipe(map(res => res));
  }
}
