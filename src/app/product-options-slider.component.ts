import {
  Component,
  ViewChild,
  ElementRef,
  Renderer,
  SkipSelf,
  NgModule,
  NgModuleFactoryLoader,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { __decorate, __metadata } from 'tslib';
import { KSSwiperContainer, KSSwiperSlide } from 'angular2-swiper';
// import { EventEmitter } from 'EventEmitter';
import { ProductService } from './product.service';

// tslint:disable

@Component({
  selector: 'product-options-slider',
  template: './app.component.html'
})

export class productOptionsSlider {
  productOptionsSlider = function() {
    function productOptionsSlider(_prodServ) {
      this._prodServ = _prodServ;
      this.productStyleClicked = new EventEmitter();
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
    productOptionsSlider.prototype.ngOnInit = function() {
      // this.options = this._prodServ.getCategoryOptions(113);
    };
    productOptionsSlider.prototype.moveNext = function() {
      this.swiperContainer.swiper.slideNext();
    };
    productOptionsSlider.prototype.movePrev = function() {
      this.swiperContainer.swiper.slidePrev();
    };
    productOptionsSlider.prototype.ngAfterViewInit = function() {
      console.log(this.swiperContainer);
    };
    productOptionsSlider.prototype.onSelect = function(basicProduct) {
      // this.currentSelectedProduct = basicProduct;
      // this.productStyleClicked.emit(this.currentSelectedProduct);
    };
    productOptionsSlider.prototype.ngOnChanges = function() {
      // this.products = this._prodServ.getProducts();
      // console.log('something changed');
      // console.log(this.currentBaseProduct);
    };
    __decorate(
      [Input(), __metadata('design:type', Array)],
      productOptionsSlider.prototype,
      'currentSelectedOption',
      void 0
    );
    __decorate(
      [Input(), __metadata('design:type', Number)],
      productOptionsSlider.prototype,
      'currentBaseProduct',
      void 0
    );
    __decorate(
      [Output(), __metadata('design:type', EventEmitter)],
      productOptionsSlider.prototype,
      'productStyleClicked',
      void 0
    );
    __decorate(
      [
        Object('ViewChild')('KSSwiperContainer'),
        __metadata('design:type', 'KSSwiperContainer')
      ],
      productOptionsSlider.prototype,
      'swiperContainer',
      void 0
    );
        __metadata('design:paramtypes', 'ProductService');
  };
}
