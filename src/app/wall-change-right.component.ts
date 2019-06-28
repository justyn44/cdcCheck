import {
  Component,
  ViewChild,
  AfterViewInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ProductService } from './product.service';
import { productStyle } from './product-style';

// tslint:disable

@Component({
  selector: 'wall-change-right',
  template: `
    <div>
      <a (click)="onSelect()" style="cursor:pointer;"
        ><img src="/assets/images/icons/rotate-right.png"
      /></a>
    </div>
  `
})
export class wallChangeRight {
  @Input() currentProduct: any;

  @Output() wallChangeRightClicked: EventEmitter<number> = new EventEmitter<
    number
  >();

  constructor(private _productService: ProductService) {}
  ngOnInit(): void {}

  onSelect(): any {
    this.currentProduct = {
      id: 1,
      name: 'Copper Creek',
      thumbnail: 'images/style_thumbnails/copper-creek.jpg',
      baseCategory: 1,
      elemente: [
        {
          id: 1,
          element_name: 'wall1',
          width: 7.3,
          height: 8,
          element_category: 'wall',
          image: 'images/peretelemn-lateral.jpg'
        },
        {
          id: 2,
          element_name: 'wall_frame',
          width: 14.8,
          height: 8,
          element_category: 'wall_frame',
          image: 'images/wall_frame.png'
        },
        {
          id: 3,
          element_name: 'window-left',
          width: 1.55,
          height: 4.8,
          element_category: 'window',
          image: 'images/fereastra.png88'
        },
        {
          id: 4,
          element_name: 'window-right',
          width: 1.55,
          height: 4.8,
          element_category: 'window',
          image: 'images/fereastra.png88'
        },
        {
          id: 5,
          element_name: 'roof1',
          width: 7.8,
          height: 3.2,
          element_category: 'roof',
          image: 'images/acoperis-lateral.png'
        },
        {
          id: 6,
          element_name: 'dormer',
          width: 4,
          height: 3.3,
          element_category: 'roof',
          image: 'images/dormer.png88'
        },
        {
          id: 7,
          element_name: 'door1',
          width: 3.446,
          height: 6.125,
          element_category: 'roof',
          image: 'images/front_door.png88'
        }
      ]
    };

    this.wallChangeRightClicked.emit(this.currentProduct);
  }
}
