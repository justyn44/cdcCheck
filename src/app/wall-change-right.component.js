"use strict";
exports.__esModule = true;
var core_1 = require("@angular/core");
var tslib_1 = require("tslib");
// import { EventEmitter } from 'EventEmitter';
// tslint:disable
var wallChangeRight = /** @class */ (function () {
    function wallChangeRight() {
        this.wallChangeRight = (function () {
            function wallChangeRight(_prodServ) {
                this._prodServ = _prodServ;
                this.wallChangeRightClicked = new core_1.EventEmitter();
            }
            wallChangeRight.prototype.ngOnInit = function () {
                // this.baseproducts = this._prodServ.getBaseProducts();
            };
            wallChangeRight.prototype.onSelect = function () {
                this.currentProduct = {
                    id: 1,
                    name: 'Copper Creek',
                    thumbnail: 'images/style_thumbnails/copper-creek.jpg',
                    baseCategory: 1,
                    elemente: [
                        {
                            id: 1,
                            element_name: 'wall1',
                            width: 7.3,
                            height: 8,
                            element_category: 'wall',
                            image: 'images/peretelemn-lateral.jpg'
                        },
                        {
                            id: 2,
                            element_name: 'wall_frame',
                            width: 14.8,
                            height: 8,
                            element_category: 'wall_frame',
                            image: 'images/wall_frame.png'
                        },
                        {
                            id: 3,
                            element_name: 'window-left',
                            width: 1.55,
                            height: 4.8,
                            element_category: 'window',
                            image: 'images/fereastra.png88'
                        },
                        {
                            id: 4,
                            element_name: 'window-right',
                            width: 1.55,
                            height: 4.8,
                            element_category: 'window',
                            image: 'images/fereastra.png88'
                        },
                        {
                            id: 5,
                            element_name: 'roof1',
                            width: 7.8,
                            height: 3.2,
                            element_category: 'roof',
                            image: 'images/acoperis-lateral.png'
                        },
                        {
                            id: 6,
                            element_name: 'dormer',
                            width: 4,
                            height: 3.3,
                            element_category: 'roof',
                            image: 'images/dormer.png88'
                        },
                        {
                            id: 7,
                            element_name: 'door1',
                            width: 3.446,
                            height: 6.125,
                            element_category: 'roof',
                            image: 'images/front_door.png88'
                        }
                    ]
                };
                this.wallChangeRightClicked.emit(this.currentProduct);
            };
            tslib_1.__decorate([Object('Input'), tslib_1.__metadata('design:type', Object)], wallChangeRight.prototype, 'currentProduct', void 0);
            tslib_1.__decorate([Object('Output'), tslib_1.__metadata('design:type', core_1.EventEmitter)], wallChangeRight.prototype, 'wallChangeRightClicked', void 0);
            wallChangeRight = tslib_1.__decorate([
                Object('Component')({
                    selector: 'wall-change-right',
                    template: '<div> <a (click)="onSelect()" style="cursor:pointer;"><img src="/assets/images/icons/rotate-right.png"></a></div>'
                }),
                tslib_1.__metadata('design:paramtypes', 'ProductService')
            ], wallChangeRight);
            return wallChangeRight;
        })();
    }
    return wallChangeRight;
}());
exports.wallChangeRight = wallChangeRight;
