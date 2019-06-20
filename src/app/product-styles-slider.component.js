"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var tslib_1 = require("tslib");
// tslint:disable
var productStylesSlider = /** @class */ (function () {
    function productStylesSlider() {
        this.productStylesSlider = (function () {
            function productStylesSlider(_prodServ, stylesCarousel) {
                this._prodServ = _prodServ;
                this.stylesCarousel = stylesCarousel;
                this.products = [];
                this.productStyleClicked = new core_1.EventEmitter();
            }
            Object.defineProperty(productStylesSlider.prototype, 'name', {
                set: function (category) {
                    this._category = category;
                    this.getCategoryStyles();
                },
                enumerable: true,
                configurable: true
            });
            productStylesSlider.prototype.ngOnInit = function () {
                this.getCategoryStyles();
                this.stylesCarousel = {
                    grid: { xs: 2, sm: 3, md: 3, lg: 5, all: 0 },
                    slide: 1,
                    speed: 400,
                    interval: 4000,
                    point: {
                        visible: true
                    },
                    load: 2,
                    touch: true,
                    loop: false,
                    custom: 'banner'
                };
            };
            productStylesSlider.prototype.getCategoryStyles = function () {
                var _this = this;
                this._prodServ.getStyles(this._category).subscribe(function (res) {
                    console.log('Trying to get styles', res);
                    _this.products = res;
                });
            };
            productStylesSlider.prototype.ngAfterViewInit = function () { };
            productStylesSlider.prototype.styleSelected = function (style) {
                // console.log('[Product Styles Slider] Style selected', style)
                this.productStyleClicked.emit(style);
            };
            productStylesSlider.prototype.ngOnChanges = function () {
                // this.products = this._prodServ.getProducts();
                // console.log('something changed');
                // console.log(this.currentBaseProduct);
            };
            productStylesSlider.prototype.carouselLoaded = function ($event) {
                console.log('carousel loaded', $event);
            };
            tslib_1.__decorate([Object('Input')(), tslib_1.__metadata('design:type', Object)], productStylesSlider.prototype, 'currentSelectedProduct', void 0);
            tslib_1.__decorate([
                Object('Input')('category'),
                tslib_1.__metadata('design:type', String),
                tslib_1.__metadata('design:paramtypes', String)
            ], productStylesSlider.prototype, 'name', null);
            tslib_1.__decorate([Object('Output')(), tslib_1.__metadata('design:type', core_1.EventEmitter)], productStylesSlider.prototype, 'productStyleClicked', void 0);
            productStylesSlider = tslib_1.__decorate(Object('Component')({
                selector: 'product-styles-slider',
                providers: [],
                template: './src/app/product-styles-slider.component.html',
                styles: './src/app/product-styles-slider.css'
            }), tslib_1.__metadata('ProductService', 'CarouselModule'), 'productStylesSlider');
            return productStylesSlider;
        })();
    }
    productStylesSlider = __decorate([
        core_1.NgModule({
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA, core_1.NO_ERRORS_SCHEMA]
        }),
        core_1.Component({
            selector: 'productStylesSlider',
            providers: [],
            template: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        tslib_1.__metadata('ProductService', 'CarouselModule')
    ], productStylesSlider);
    return productStylesSlider;
}());
exports.productStylesSlider = productStylesSlider;
