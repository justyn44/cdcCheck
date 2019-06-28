import {Component, ViewChild, AfterViewInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { productStyle } from './product-style';
import { ProductService } from './product.service';
import 'hammerjs';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

// tslint:disable

@Component({
  selector: 'product-styles-slider',
  providers: [NguCarouselConfig],
  templateUrl: './product-styles-slider.html',
  styleUrls: ['./product-styles-slider.css']
})

export class productStylesSlider{ 
  productStylesOptions: any;
  products=[];
  _category;

  @Input() currentSelectedProduct;
  @Input('category')
  set name(category: string) {
     this._category = category;
     this.getCategoryStyles();
  }


  @Output() productStyleClicked:EventEmitter<number> = new EventEmitter<number>();


  constructor(private _productService: ProductService, public stylesCarousel: NguCarouselConfig) {
    
  } 

  ngOnInit(): void{
    this.getCategoryStyles();
    this.stylesCarousel = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
      slide: 1,
      speed: 400,
      load: 2,
      touch: true,
      loop: false,
      point: {
        visible: true,
        hideOnSingleSlide: true
      },
      custom: 'banner'
    }
  }

  getCategoryStyles(){
    this._productService.getStyles(this._category)
    .subscribe((res)=>{
      console.log('Trying to get styles', res)
      this.products = res
    })
  }

  ngAfterViewInit() {
   }

  styleSelected(style){
    this.productStyleClicked.emit(style);
  }
  
  ngOnChanges(): void{
  }

  carouselLoaded($event){
    console.log('carousel loaded', $event);
  }
}
