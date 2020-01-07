import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHeaders } from '@globals/routeheaders';
import { map } from 'rxjs/operators';
import * as devRoutes from '../../globals/devroutes';
import * as prodRoutes from '../../globals/prodroutes';

@Injectable({
  providedIn: 'root'
})
export class CMAgentService {

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

  getPaidLogs() {
    return this.http.get(this.routeBase + '/editlogs/paid', {headers: BaseHeaders})
      .pipe(map(res => res));
  }

  getPaidLogsForUser(userHandle: string) {
    return this.http.get(this.routeBase + '/editlogs/paid/' + userHandle, {headers: BaseHeaders})
      .pipe(map(res => res));
  }

  getCMAgents() {
    return this.http.get(this.routeBase + '/editlogs/users', {headers: BaseHeaders})
      .pipe(map(res => res));
  }
}
