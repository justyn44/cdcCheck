import {
  Component,
  ViewChild,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { ProductService } from './product.service';
import { NguCarouselConfig, NguCarousel } from '@ngu/carousel';

// tslint:disable

@Component({
  selector: 'categorySlider',
  templateUrl: 'category-slider.component.html',
  styleUrls: ['category-slider.css'],
  providers: [NguCarouselConfig]
})
export class categorySlider implements OnInit{
  productStylesOptions: any;
  categories;
  items;
  @Input() currentCategory: number;
  @Output() baseProductClicked: EventEmitter<number> = new EventEmitter<
    number
  >();
  constructor(
    private _productService: ProductService,
    public carouselOne: NguCarouselConfig
  ) {}
  ngOnInit(): void {
    this.categories = this._productService.getCategories();
    this.items = ['it1', 'it2', 'it3'];
    this.carouselOne = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: {
        timing: 4000,
        initialDelay: 1000
      },
      point: {
        visible: true
      },
      load: 2,
      touch: false,
      loop: true,
      custom: 'banner'
    };
  }
  moveNext() {}
  movePrev() {}
  onSelect(basicProduct) {
    console.log('Basic:' + basicProduct.id);
    this.currentCategory = basicProduct.id;
    this.baseProductClicked.emit(this.currentCategory);
  }
  ngAfterViewInit() {}
}
