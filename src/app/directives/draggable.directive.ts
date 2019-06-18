import {
  Component,
  ViewChild,
  ElementRef,
  Renderer,
  Renderer2,
  SkipSelf,
  NgModule,
  NgModuleFactoryLoader,
  Directive,
  Input
} from '@angular/core';
import { __decorate, __metadata } from 'tslib';

// tslint:disable
export class DaliDraggable {
  DaliDraggable = (function() {
    function DaliDraggable(el, renderer) {
      this.el = el;
      this.renderer = renderer;
      this.Δx = 0;
      this.Δy = 0;
      this.mustBePosition = ['absolute', 'fixed', 'relative'];
    }
    DaliDraggable.prototype.ngOnInit = function() {
      this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'true');
    };
    DaliDraggable.prototype.onDragStart = function(event) {
      this.Δx = event.x - this.el.nativeElement.offsetLeft;
      this.Δy = event.y - this.el.nativeElement.offsetTop;
    };
    DaliDraggable.prototype.onDrag = function(event) {
      this.doTranslation(event.x, event.y);
    };
    DaliDraggable.prototype.onDragEnd = function(event) {
      this.doTranslation(event.x, event.y);
      this.Δx = 0;
      this.Δy = 0;
    };
    DaliDraggable.prototype.doTranslation = function(x, y) {
      if (!x || !y) {
        return;
      }
      let leftOffset = x - this.Δx;
      let topOffset = y - this.Δy;
      if (this.boundary.left && leftOffset < this.boundary.left) {
        leftOffset = this.boundary.left;
      }
      if (
        this.boundary.right &&
        leftOffset + this.el.nativeElement.offsetWidth > this.boundary.right
      ) {
        leftOffset = this.boundary.right - this.el.nativeElement.offsetWidth;
      }
      if (this.boundary.top && topOffset < this.boundary.top) {
        topOffset = this.boundary.top;
      }
      if (
        this.boundary.top &&
        topOffset + this.el.nativeElement.offsetHeight > this.boundary.bottom
      ) {
        topOffset = this.boundary.bottom - this.el.nativeElement.offsetHeight;
      }
      this.renderer.setStyle(this.el.nativeElement, 'left', leftOffset + 'px');
      this.renderer.setStyle(this.el.nativeElement, 'top', topOffset + 'px');
    };
    DaliDraggable.prototype.ngOnDestroy = function() {
      this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'false');
    };
    __decorate(
      [Input(), __metadata('design:type', Object)],
      DaliDraggable.prototype,
      'boundary',
      void 0
    );
    DaliDraggable = __decorate(
      [
        Directive({
          selector: '[dalidraggable]',
          host: {
            '(dragstart)': 'onDragStart($event)',
            '(dragend)': 'onDragEnd($event)',
            '(drag)': 'onDrag($event)'
          }
        }),
        __metadata('ElementRef', 'Renderer2')
      ],
      DaliDraggable
    );
    return DaliDraggable;
  })();
}
