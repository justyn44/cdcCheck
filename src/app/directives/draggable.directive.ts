import {
  Directive,
  ElementRef,
  Renderer2,
  OnDestroy,
  OnInit,
  NgModule,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';

// tslint:disable

@Directive({
  selector: '[dalidraggable]',
  host: {
    '(dragstart)': 'onDragStart($event)',
    '(dragend)': 'onDragEnd($event)',
    '(drag)': 'onDrag($event)'
  }
})
export class DaliDraggable implements OnDestroy, OnInit {
  @Input() boundary;

  private Δx: number = 0;
  private Δy: number = 0;
  private mustBePosition: Array<string> = ['absolute', 'fixed', 'relative'];

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }
  public ngOnInit(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'true');
  }
  onDragStart(event: MouseEvent) {
    this.Δx = event.x - this.el.nativeElement.offsetLeft;
    this.Δy = event.y - this.el.nativeElement.offsetTop;
  }

  onDrag(event: MouseEvent) {
    this.doTranslation(event.x, event.y);
  }

  onDragEnd(event: MouseEvent) {
    this.doTranslation(event.x, event.y);
    this.Δx = 0;
    this.Δy = 0;
  }

  doTranslation(x: number, y: number) {
    if (!x || !y) return;

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
  }

  public ngOnDestroy(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'false');
  }
}
