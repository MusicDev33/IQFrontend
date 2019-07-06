import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DebugService {

  constructor() { }

  log(text){
    if (isDevMode){
      console.log(text)
    }
  }
}
