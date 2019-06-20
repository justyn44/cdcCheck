"use strict";
exports.__esModule = true;
var core_1 = require("@angular/core");
var tslib_1 = require("tslib");
// import { EventEmitter } from 'EventEmitter';
// tslint:disable
var CanvasInteractionDirective = /** @class */ (function () {
    function CanvasInteractionDirective() {
        this.CanvasInteractionDirective = (function () {
            function CanvasInteractionDirective() {
                this.onMouseDown = new core_1.EventEmitter();
                this.onMouseUp = new core_1.EventEmitter();
                this.onMouseMove = new core_1.EventEmitter();
            }
            CanvasInteractionDirective.prototype.onClickDown = function (event) {
                this.onMouseDown.emit(event);
            };
            CanvasInteractionDirective.prototype.onClickUp = function (event) {
                this.onMouseUp.emit(event);
            };
            CanvasInteractionDirective.prototype.onMove = function (event) {
                this.onMouseMove.emit(event);
            };
            tslib_1.__decorate([core_1.Output(), tslib_1.__metadata('design:type', core_1.EventEmitter)], CanvasInteractionDirective.prototype, 'onMouseDown', void 0);
            tslib_1.__decorate([core_1.Output(), tslib_1.__metadata('design:type', core_1.EventEmitter)], CanvasInteractionDirective.prototype, 'onMouseUp', void 0);
            tslib_1.__decorate([core_1.Output(), tslib_1.__metadata('design:type', core_1.EventEmitter)], CanvasInteractionDirective.prototype, 'onMouseMove', void 0);
            tslib_1.__decorate([
                core_1.HostListener('mousedown', ['$event']),
                tslib_1.__metadata('design:type', Function),
                tslib_1.__metadata('design:paramtypes', [Object]),
                tslib_1.__metadata('design:returntype', void 0)
            ], CanvasInteractionDirective.prototype, 'onClickDown', null);
            tslib_1.__decorate([
                core_1.HostListener('mouseup', ['$event']),
                tslib_1.__metadata('design:type', Function),
                tslib_1.__metadata('design:paramtypes', [Object]),
                tslib_1.__metadata('design:returntype', void 0)
            ], CanvasInteractionDirective.prototype, 'onClickUp', null);
            tslib_1.__decorate([
                core_1.HostListener('mousemove', ['$event']),
                tslib_1.__metadata('design:type', Function),
                tslib_1.__metadata('design:paramtypes', [Object]),
                tslib_1.__metadata('design:returntype', void 0)
            ], CanvasInteractionDirective.prototype, 'onMove', null);
            CanvasInteractionDirective = tslib_1.__decorate([
                core_1.Directive({
                    selector: '[canvasinteraction]'
                }),
                tslib_1.__metadata('design:paramtypes', [])
            ], CanvasInteractionDirective);
            return CanvasInteractionDirective;
        })();
    }
    return CanvasInteractionDirective;
}());
exports.CanvasInteractionDirective = CanvasInteractionDirective;
