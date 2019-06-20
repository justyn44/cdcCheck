"use strict";
exports.__esModule = true;
var core_1 = require("@angular/core");
var tslib_1 = require("tslib");
// tslint:disable
var productOptionsSlider = /** @class */ (function () {
    function productOptionsSlider() {
        this.productOptionsSlider = function () {
            function productOptionsSlider(_prodServ) {
                this._prodServ = _prodServ;
                this.productStyleClicked = new core_1.EventEmitter();
                this.productOptionsSlider = {
                    pagination: '.product-options-pagination',
                    nextButton: '.product-options-button-next',
                    prevButton: '.product-options-button-prev',
                    slidesPerView: 6,
                    paginationClickable: true,
                    spaceBetween: 30,
                    breakpoints: {
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 40
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        }
                    }
                };
            }
            productOptionsSlider.prototype.ngOnInit = function () {
                // this.options = this._prodServ.getCategoryOptions(113);
            };
            productOptionsSlider.prototype.moveNext = function () {
                this.swiperContainer.swiper.slideNext();
            };
            productOptionsSlider.prototype.movePrev = function () {
                this.swiperContainer.swiper.slidePrev();
            };
            productOptionsSlider.prototype.ngAfterViewInit = function () {
                console.log(this.swiperContainer);
            };
            productOptionsSlider.prototype.onSelect = function (basicProduct) {
                // this.currentSelectedProduct = basicProduct;
                // this.productStyleClicked.emit(this.currentSelectedProduct);
            };
            productOptionsSlider.prototype.ngOnChanges = function () {
                // this.products = this._prodServ.getProducts();
                // console.log('something changed');
                // console.log(this.currentBaseProduct);
            };
            tslib_1.__decorate([Object('Input')(), tslib_1.__metadata('design:type', Array)], productOptionsSlider.prototype, 'currentSelectedOption', void 0);
            tslib_1.__decorate([Object('Input')(), tslib_1.__metadata('design:type', Number)], productOptionsSlider.prototype, 'currentBaseProduct', void 0);
            tslib_1.__decorate([Object('Output')(), tslib_1.__metadata('design:type', core_1.EventEmitter)], productOptionsSlider.prototype, 'productStyleClicked', void 0);
            tslib_1.__decorate([
                Object('ViewChild')('KSSwiperContainer'),
                tslib_1.__metadata('design:type', 'KSSwiperContainer')
            ], productOptionsSlider.prototype, 'swiperContainer', void 0);
            productOptionsSlider = tslib_1.__decorate([
                Object('Component')({
                    selector: 'product-options-slider',
                    template: 'src/app/product-options-slider.component.html'
                }),
                tslib_1.__metadata('design:paramtypes', 'ProductService')
            ], productOptionsSlider);
            return productOptionsSlider;
        };
    }
    return productOptionsSlider;
}());
exports.productOptionsSlider = productOptionsSlider;
