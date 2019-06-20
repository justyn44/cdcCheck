"use strict";
exports.__esModule = true;
var core_1 = require("@angular/core");
var tslib_1 = require("tslib");
require("reflect-metadata");
// import { EventEmitter } from 'EventEmitter';
// tslint:disable
var wallChangeLeft = /** @class */ (function () {
    function wallChangeLeft() {
        this.wallChangeLeft = (function () {
            function wallChangeLeft(_prodServ) {
                this._prodServ = _prodServ;
                this.wallChangeLeftClicked = new core_1.EventEmitter();
            }
            wallChangeLeft.prototype.ngOnInit = function () {
                // this.baseproducts = this._prodServ.getBaseProducts();
            };
            wallChangeLeft.prototype.onSelect = function () {
                this.currentProduct = {
                    id: 1,
                    name: 'Copper Creek',
                    thumbnail: '/assets/images/style_thumbnails/copper-creek.jpg',
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
                            width: 8.3,
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
                console.log('components:' + this.zidCurent);
                this.wallChangeLeftClicked.emit(this.currentProduct);
            };
            tslib_1.__decorate(Object('Input')(), tslib_1.__metadata('design:type', Object), wallChangeLeft.prototype, 'currentProduct');
            tslib_1.__decorate(Object('Input')(), tslib_1.__metadata('design:type', Number), wallChangeLeft.prototype, 'zidCurent');
            tslib_1.__decorate(Object('Output')(), tslib_1.__metadata('design:type', core_1.EventEmitter), wallChangeLeft.prototype, 'wallChangeLeftClicked');
            wallChangeLeft = tslib_1.__decorate(Object('Component')({
                selector: 'wall-change-left',
                template: '<div><a style="cursor:pointer;" (click)="onSelect()" ><img src="/assets/images/icons/rotate-left.png"></a></div>'
            }), tslib_1.__metadata('design:paramtypes', 'ProductService'), wallChangeLeft);
            return wallChangeLeft;
        })();
    }
    return wallChangeLeft;
}());
exports.wallChangeLeft = wallChangeLeft;
