import {
  Directive,
  ElementRef,
  Renderer2,
  OnDestroy,
  OnInit,
  NgModule,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';

// tslint:disable

@Directive({
  selector: '[canvasinteraction]'
})
export class CanvasInteractionDirective {
  @Output() onMouseDown: EventEmitter<any> = new EventEmitter();
  @Output() onMouseUp: EventEmitter<any> = new EventEmitter();
  @Output() onMouseMove: EventEmitter<any> = new EventEmitter();

  @HostListener('mousedown', ['$event'])
  onClickDown(event: any): void {
    this.onMouseDown.emit(event);
  }

  @HostListener('mouseup', ['$event'])
  onClickUp(event: any): void {
    this.onMouseUp.emit(event);
  }

  @HostListener('mousemove', ['$event'])
  onMove(event: any): void {
    this.onMouseMove.emit(event);
  }

  constructor() {}
}
