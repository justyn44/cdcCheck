import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { DaliDraggable } from './directives/draggable.directive';
import { CanvasInteractionDirective } from './directives/canvasinteraction.directive';
import { categorySlider } from './category-slider.component';
import { productStylesSlider } from './product-styles-slider.component';
import { productOptionsSlider } from './product-options-slider.component';
import { optionsCategories  } from './options-categories-slider.component';
import { wallChangeLeft } from './wall-change-left.component';
import { wallChangeRight } from './wall-change-right.component';
import { ImageUploadModule } from 'angular2-image-upload';
import { OwlModule } from 'ngx-owl-carousel';
import { NguCarousel, NguCarouselModule } from '@ngu/carousel';
import 'hammerjs';

// tslint:disable 

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    OwlModule,
    NguCarouselModule,
    ImageUploadModule.forRoot()
  ],
  declarations: [
    AppComponent,
    categorySlider,
    productStylesSlider,
    productOptionsSlider,
    DaliDraggable,
    optionsCategories ,
    wallChangeLeft,
    wallChangeRight,
    CanvasInteractionDirective
  ],
  bootstrap: [AppComponent],
  providers: [NguCarousel]
})
export class AppModule {}
