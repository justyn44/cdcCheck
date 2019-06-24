import {
  Component,
  ViewChild,
  ElementRef,
  Renderer,
  SkipSelf,
  NgModule,
  NgModuleFactoryLoader,
  EventEmitter,
  Output,
  HostListener,
  Directive
} from '@angular/core';
import { __decorate, __metadata } from 'tslib';
// import { EventEmitter } from 'EventEmitter';

// tslint:disable

@Directive({
  selector: '[canvasinteraction]'
})

export class CanvasInteractionDirective {
  CanvasInteractionDirective = (function() {
    function CanvasInteractionDirective() {
      this.onMouseDown = new EventEmitter();
      this.onMouseUp = new EventEmitter();
      this.onMouseMove = new EventEmitter();
    }
    CanvasInteractionDirective.prototype.onClickDown = function(event) {
      this.onMouseDown.emit(event);
    };
    CanvasInteractionDirective.prototype.onClickUp = function(event) {
      this.onMouseUp.emit(event);
    };
    CanvasInteractionDirective.prototype.onMove = function(event) {
      this.onMouseMove.emit(event);
    };
    __decorate(
      [Output(), __metadata('design:type', EventEmitter)],
      CanvasInteractionDirective.prototype,
      'onMouseDown',
      void 0
    );
    __decorate(
      [Output(), __metadata('design:type', EventEmitter)],
      CanvasInteractionDirective.prototype,
      'onMouseUp',
      void 0
    );
    __decorate(
      [Output(), __metadata('design:type', EventEmitter)],
      CanvasInteractionDirective.prototype,
      'onMouseMove',
      void 0
    );
    __decorate(
      [
        HostListener('mousedown', ['$event']),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object]),
        __metadata('design:returntype', void 0)
      ],
      CanvasInteractionDirective.prototype,
      'onClickDown',
      null
    );
    __decorate(
      [
        HostListener('mouseup', ['$event']),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object]),
        __metadata('design:returntype', void 0)
      ],
      CanvasInteractionDirective.prototype,
      'onClickUp',
      null
    );
    __decorate(
      [
        HostListener('mousemove', ['$event']),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object]),
        __metadata('design:returntype', void 0)
      ],
      CanvasInteractionDirective.prototype,
      'onMove',
      null
    );
  })();
}
