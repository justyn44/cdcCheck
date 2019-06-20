"use strict";
exports.__esModule = true;
var core_1 = require("@angular/core");
var tslib_1 = require("tslib");
require("reflect-metadata");
// tslint:disable
var optionsCategoriesSlider = /** @class */ (function () {
    function optionsCategoriesSlider() {
        this.optionsCategoriesSlider = function () {
            function optionsCategoriesSlider(_prodServ) {
                this._prodServ = _prodServ;
                this.baseProductClicked = new core_1.EventEmitter();
                this.productStylesOptions = {
                    nextButton: '.options-categories-button-next',
                    prevButton: '.options-categories-button-prev',
                    slidesPerView: 3,
                    centeredSlides: true,
                    paginationClickable: true,
                    direction: 'vertical'
                };
            }
            optionsCategoriesSlider.prototype.ngOnInit = function () {
                this.optionsCategories = this._prodServ.getOptionsCategories();
            };
            optionsCategoriesSlider.prototype.moveNext = function () {
                this.swiperContainer.swiper.slideNext();
            };
            optionsCategoriesSlider.prototype.movePrev = function () {
                this.swiperContainer.swiper.slidePrev();
            };
            optionsCategoriesSlider.prototype.onSelect = function (basicProduct) {
                console.log('Basic:' + basicProduct.id);
                this.currentCategory = basicProduct.id;
                this.baseProductClicked.emit(this.currentCategory);
            };
            optionsCategoriesSlider.prototype.ngAfterViewInit = function () {
                console.log(this.swiperContainer);
            };
            tslib_1.__decorate([Object('Input')(), tslib_1.__metadata('design:type', Number)], optionsCategoriesSlider.prototype, 'currentCategory', void 0);
            tslib_1.__decorate([Object('Output')(), tslib_1.__metadata('design:type', core_1.EventEmitter)], optionsCategoriesSlider.prototype, 'baseProductClicked', void 0);
            tslib_1.__decorate([
                Object('ViewChild')('KSSwiperContainer'),
                tslib_1.__metadata('design:type', 'KSSwiperContainer')
            ], optionsCategoriesSlider.prototype, 'swiperContainer', void 0);
            optionsCategoriesSlider = tslib_1.__decorate([
                Object('Component')({
                    selector: 'options-categories-slider',
                    template: 'src/app/options-categories-slider.component.html'
                }),
                tslib_1.__metadata('design:paramtypes', 'ProductService')
            ], optionsCategoriesSlider);
            return optionsCategoriesSlider;
        };
    }
    return optionsCategoriesSlider;
}());
exports.optionsCategoriesSlider = optionsCategoriesSlider;
