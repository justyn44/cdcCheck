import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// tslint:disable

export class UtilitiesService {

  constructor() { }

  public getStandardChildSizes(scale){
    let reverseScale = scale
console.log('[Utilities Service] Scale ', scale)
    for (var p in reverseScale) {
      if( reverseScale.hasOwnProperty(p) ) {
        reverseScale[p] = 1 / reverseScale[p]
      } 
    }       
console.log('[Utilities Service] ReverseScale ', reverseScale)
    return reverseScale;
  }
}
