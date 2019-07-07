import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IpgenService {

  constructor(private http: HttpClient) { }

  getIpAddress(){
    return this.http.get('http://api.ipstack.com/check?access_key=83f4fcb9793856e9abc98aba91b34ae0').pipe(map(res => res))
  }

  sendIpAddress(location){
    return this.http.post('http://104.248.68.166:2999/api/v1/users/location/add', location).pipe(map(res => res))
  }
}
