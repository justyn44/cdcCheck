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
import 'reflect-metadata';
import { KSSwiperContainer, KSSwiperSlide } from 'angular2-swiper';
// import { EventEmitter } from 'EventEmitter';
import { ProductService } from './product.service';

// tslint:disable

@Component({
  selector: 'options-categories-slider',
  template: 'src/app/options-categories-slider.component.html'
})

export class optionsCategoriesSlider {
  optionsCategoriesSlider = function() {
    function optionsCategoriesSlider(_prodServ) {
      this._prodServ = _prodServ;
      this.baseProductClicked = new EventEmitter();
      this.productStylesOptions = {
        nextButton: '.options-categories-button-next',
        prevButton: '.options-categories-button-prev',
        slidesPerView: 3,
        centeredSlides: true,
        paginationClickable: true,
        direction: 'vertical'
      };
    }
    optionsCategoriesSlider.prototype.ngOnInit = function() {
      this.optionsCategories = this._prodServ.getOptionsCategories();
    };
    optionsCategoriesSlider.prototype.moveNext = function() {
      this.swiperContainer.swiper.slideNext();
    };
    optionsCategoriesSlider.prototype.movePrev = function() {
      this.swiperContainer.swiper.slidePrev();
    };
    optionsCategoriesSlider.prototype.onSelect = function(basicProduct) {
      console.log('Basic:' + basicProduct.id);
      this.currentCategory = basicProduct.id;
      this.baseProductClicked.emit(this.currentCategory);
    };
    optionsCategoriesSlider.prototype.ngAfterViewInit = function() {
      console.log(this.swiperContainer);
    };
    __decorate(
      [Input(), __metadata('design:type', Number)],
      optionsCategoriesSlider.prototype,
      'currentCategory',
      void 0
    );
    __decorate(
      [Output(), __metadata('design:type', EventEmitter)],
      optionsCategoriesSlider.prototype,
      'baseProductClicked',
      void 0
    );
    __decorate(
      [
        ViewChild('KSSwiperContainer', { static: false }),
        __metadata('design:type', 'KSSwiperContainer')
      ],
      optionsCategoriesSlider.prototype,
      'swiperContainer',
      void 0
    );
    __metadata('design:paramtypes', 'ProductService');
  };
}
