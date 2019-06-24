import {
  Component,
  ViewChild,
  ElementRef,
  Renderer,
  SkipSelf,
  NgModule,
  NgModuleFactoryLoader,
  Injectable
} from '@angular/core';
import { __decorate, __metadata } from 'tslib';

// tslint:disable

@Injectable({
  providedIn: 'root'
})

export class UtilitiesService {
  UtilitiesService = (function() {
    function UtilitiesService() {}
    UtilitiesService.prototype.getStandardChildSizes = function(scale) {
      const reverseScale = scale;
      console.log('[Utilities Service] Scale ', scale);
      for (const p in reverseScale) {
        if (reverseScale.hasOwnProperty(p)) {
          reverseScale[p] = 1 / reverseScale[p];
        }
      }
      console.log('[Utilities Service] ReverseScale ', reverseScale);
      return reverseScale;
    };
    __metadata('design:paramtypes', []);
  })();
}
