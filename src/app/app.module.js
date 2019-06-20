"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_owl_carousel_1 = require("ngx-owl-carousel");
var ngx_carousels_1 = require("ngx-carousels");
var tslib_1 = require("tslib");
require("reflect-metadata");
var angular2_image_upload_1 = require("angular2-image-upload");
var categorySlider_1 = require("./categorySlider");
var product_styles_slider_component_1 = require("./product-styles-slider.component");
var product_options_slider_component_1 = require("./product-options-slider.component");
var draggable_directive_1 = require("./directives/draggable.directive");
var options_categories_slider_component_1 = require("./options-categories-slider.component");
var wall_change_left_component_1 = require("./wall-change-left.component");
var wall_change_right_component_1 = require("./wall-change-right.component");
var canvasinteraction_directive_1 = require("./directives/canvasinteraction.directive");
var card_1 = require("@angular/material/card");
var http_2 = require("@angular/common/http");
require("rxjs-compat");
var atft_1 = require("atft");
// tslint:disable
var AppModule = /** @class */ (function () {
    function AppModule() {
        this.AppModule = (function () {
            function AppModule() { }
            AppModule = tslib_1.__decorate(core_1.NgModule({
                imports: [
                    platform_browser_1.BrowserModule,
                    animations_1.BrowserAnimationsModule,
                    card_1.MatCardModule,
                    forms_1.FormsModule,
                    http_1.HttpModule,
                    http_2.HttpClientModule,
                    ngx_owl_carousel_1.OwlModule,
                    ngx_carousels_1.CarouselModule,
                    angular2_image_upload_1.ImageUploadModule.forRoot()
                ],
                declarations: [app_component_1.CDCApp],
                categorySlider: categorySlider_1.categorySlider,
                productStylesSlider: product_styles_slider_component_1.productStylesSlider,
                productOptionsSlider: product_options_slider_component_1.productOptionsSlider,
                DaliDraggable: draggable_directive_1.DaliDraggable,
                optionsCategoriesSlider: options_categories_slider_component_1.optionsCategoriesSlider,
                wallChangeLeft: wall_change_left_component_1.wallChangeLeft,
                wallChangeRight: wall_change_right_component_1.wallChangeRight,
                CanvasInteractionDirective: canvasinteraction_directive_1.CanvasInteractionDirective,
                bootstrap: [app_component_1.CDCApp],
                providers: [ngx_carousels_1.CarouselModule]
            }), AppModule);
            return AppModule;
        })();
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.CDCApp],
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, atft_1.AtftModule],
            providers: [],
            bootstrap: [app_component_1.CDCApp]
        }),
        core_1.Component({})
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
