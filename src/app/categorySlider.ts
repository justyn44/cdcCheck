import { EventEmitter, Component, Input, Output } from '@angular/core';
import { __decorate, __metadata } from 'tslib';

// tslint:disable

@Component({
  selector: 'category-slider',
  template: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class categorySlider {
  categorySlider = (function() {
    function categorySlider(_prodServ, carouselOne) {
      this._prodServ = _prodServ;
      this.carouselOne = carouselOne;
      this.baseProductClicked = new EventEmitter();
    }
    categorySlider.prototype.ngOnInit = function() {
      this.categories = this._prodServ.getCategories();
      this.items = ['it1', 'it2', 'it3'];
      this.carouselOne = {
        grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
        slide: 1,
        speed: 400,
        interval: 4000,
        point: {
          visible: true
        },
        load: 2,
        touch: true,
        loop: true,
        custom: 'banner'
      };
    };
    categorySlider.prototype.moveNext = function() {
      // this.swiperContainer.swiper.slideNext();
    };
    categorySlider.prototype.movePrev = function() {
      // this.swiperContainer.swiper.slidePrev();
    };
    categorySlider.prototype.onSelect = function(basicProduct) {
      console.log('Basic:' + basicProduct.id);
      this.currentCategory = basicProduct.id;
      this.baseProductClicked.emit(this.currentCategory);
    };
    categorySlider.prototype.ngAfterViewInit = function() {
      // console.log(this.swiperContainer);
    };
    __decorate(
      [Input(), __metadata('design:type', Number)],
      categorySlider.prototype,
      'currentCategory',
      void 0
    );
    __decorate(
      [Output(), __metadata('design:type', EventEmitter)],
      categorySlider.prototype,
      'baseProductClicked',
      void 0
    );
    __metadata('ProductService', 'NguCarousel')
  })();
}
