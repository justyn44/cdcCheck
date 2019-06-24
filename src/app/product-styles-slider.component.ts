import {
  Component,
  ViewChild,
  ElementRef,
  Renderer,
  SkipSelf,
  NgModule,
  NgModuleFactoryLoader,
  EventEmitter,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { __decorate, __metadata } from 'tslib';
// import { EventEmitter } from 'EventEmitter';
import { ProductService } from './product.service';
import { CarouselModule } from 'ngx-carousels';

// tslint:disable

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
@Component({
  selector: 'productStylesSlider',
  providers: [],
  template: './app.component.html',
  styleUrls: ['./app.component.css']
})

@__metadata('ProductService', 'CarouselModule')
export class productStylesSlider {
  productStylesSlider = (function() {
    function productStylesSlider(_prodServ, stylesCarousel) {
      this._prodServ = _prodServ;
      this.stylesCarousel = stylesCarousel;
      this.products = [];
      this.productStyleClicked = new EventEmitter();
    }
    Object.defineProperty(productStylesSlider.prototype, 'name', {
      set: function(category) {
        this._category = category;
        this.getCategoryStyles();
      },
      enumerable: true,
      configurable: true
    });
    productStylesSlider.prototype.ngOnInit = function() {
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
    productStylesSlider.prototype.getCategoryStyles = function() {
      const _this = this;
      this._prodServ.getStyles(this._category).subscribe(function(res) {
        console.log('Trying to get styles', res);
        _this.products = res;
      });
    };
    productStylesSlider.prototype.ngAfterViewInit = function() {};
    productStylesSlider.prototype.styleSelected = function(style) {
      // console.log('[Product Styles Slider] Style selected', style)
      this.productStyleClicked.emit(style);
    };
    productStylesSlider.prototype.ngOnChanges = function() {
      // this.products = this._prodServ.getProducts();
      // console.log('something changed');
      // console.log(this.currentBaseProduct);
    };
    productStylesSlider.prototype.carouselLoaded = function($event) {
      console.log('carousel loaded', $event);
    };
    __decorate(
      [Object('Input')(), __metadata('design:type', Object)],
      productStylesSlider.prototype,
      'currentSelectedProduct',
      void 0
    );
    __decorate(
      [
        Object('Input')('category'),
        __metadata('design:type', String),
        __metadata('design:paramtypes', String)
      ],
      productStylesSlider.prototype,
      'name',
      null
    );
    __decorate(
      [Object('Output')(), __metadata('design:type', EventEmitter)],
      productStylesSlider.prototype,
      'productStyleClicked',
      void 0
    );
      __metadata('ProductService', 'CarouselModule'),
      'productStylesSlider';
  })();
}
