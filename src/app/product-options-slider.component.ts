import {Component, ViewChild, AfterViewInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {KSSwiperContainer, KSSwiperSlide} from 'angular2-swiper';
import { productOptions } from './product-options';
import { ProductService } from './product.service';

// tslint:disable

@Component({
  selector: 'product-options-slider',
  templateUrl: 'product-options-slider.component.html' 
})

export class productOptionsSlider{ 
  productOptionsSlider: any;
  options: productOptions[];
  @Input() currentSelectedOption : productOptions[];
  @Input() currentBaseProduct : number;
  @Output() productStyleClicked:EventEmitter<productOptions[]> = new EventEmitter<productOptions[]>();
  @ViewChild(KSSwiperContainer, { static: false }) swiperContainer: KSSwiperContainer;
  constructor(private _productService: ProductService) {
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
  ngOnInit(): void{
  }
  moveNext() {
    this.swiperContainer.swiper.slideNext();
  }
  movePrev() {
    this.swiperContainer.swiper.slidePrev();
  }
  ngAfterViewInit() {
    console.log(this.swiperContainer);
   }
  onSelect(basicProduct){
  }
  ngOnChanges(): void{
  }
}

