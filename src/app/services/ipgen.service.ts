import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IpgenService {

  constructor(private http: HttpClient) { }

  getIpAddress() {
    return this.http.get('https://ipapi.co/json/').pipe(map(res => res));
  }

  sendIpAddress(location) {
    return this.http.post('https://inquantir.com/api/v1/users/location/add', location).pipe(map(res => res));
  }
}
