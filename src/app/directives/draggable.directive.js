"use strict";
exports.__esModule = true;
var core_1 = require("@angular/core");
var tslib_1 = require("tslib");
// tslint:disable
var DaliDraggable = /** @class */ (function () {
    function DaliDraggable() {
        this.DaliDraggable = (function () {
            function DaliDraggable(el, renderer) {
                this.el = el;
                this.renderer = renderer;
                this.Δx = 0;
                this.Δy = 0;
                this.mustBePosition = ['absolute', 'fixed', 'relative'];
            }
            DaliDraggable.prototype.ngOnInit = function () {
                this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'true');
            };
            DaliDraggable.prototype.onDragStart = function (event) {
                this.Δx = event.x - this.el.nativeElement.offsetLeft;
                this.Δy = event.y - this.el.nativeElement.offsetTop;
            };
            DaliDraggable.prototype.onDrag = function (event) {
                this.doTranslation(event.x, event.y);
            };
            DaliDraggable.prototype.onDragEnd = function (event) {
                this.doTranslation(event.x, event.y);
                this.Δx = 0;
                this.Δy = 0;
            };
            DaliDraggable.prototype.doTranslation = function (x, y) {
                if (!x || !y) {
                    return;
                }
                var leftOffset = x - this.Δx;
                var topOffset = y - this.Δy;
                if (this.boundary.left && leftOffset < this.boundary.left) {
                    leftOffset = this.boundary.left;
                }
                if (this.boundary.right &&
                    leftOffset + this.el.nativeElement.offsetWidth > this.boundary.right) {
                    leftOffset = this.boundary.right - this.el.nativeElement.offsetWidth;
                }
                if (this.boundary.top && topOffset < this.boundary.top) {
                    topOffset = this.boundary.top;
                }
                if (this.boundary.top &&
                    topOffset + this.el.nativeElement.offsetHeight > this.boundary.bottom) {
                    topOffset = this.boundary.bottom - this.el.nativeElement.offsetHeight;
                }
                this.renderer.setStyle(this.el.nativeElement, 'left', leftOffset + 'px');
                this.renderer.setStyle(this.el.nativeElement, 'top', topOffset + 'px');
            };
            DaliDraggable.prototype.ngOnDestroy = function () {
                this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'false');
            };
            tslib_1.__decorate([core_1.Input(), tslib_1.__metadata('design:type', Object)], DaliDraggable.prototype, 'boundary', void 0);
            DaliDraggable = tslib_1.__decorate([
                core_1.Directive({
                    selector: '[dalidraggable]',
                    host: {
                        '(dragstart)': 'onDragStart($event)',
                        '(dragend)': 'onDragEnd($event)',
                        '(drag)': 'onDrag($event)'
                    }
                }),
                tslib_1.__metadata('ElementRef', 'Renderer2')
            ], DaliDraggable);
            return DaliDraggable;
        })();
    }
    return DaliDraggable;
}());
exports.DaliDraggable = DaliDraggable;
