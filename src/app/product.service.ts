import {
    Component,
    ViewChild,
    ElementRef,
    Renderer,
    SkipSelf,
    NgModule,
    NgModuleFactoryLoader,
    Injectable
  } from '@angular/core';
import { __decorate, __metadata } from 'tslib';
import 'reflect-metadata';
import 'rxjs-compat';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { xml2js } from 'xml2js';
import { Headers, RequestOptions, Http } from '@angular/http';
import { productStyle } from './product-style';

// tslint:disable
export class ProductService {
ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        this.selectedProduct = 'productStyle';
        this.apiUrl = 'http://localhost:4200/summerwoodapi';
    }
    ProductService.prototype.convertXMLToJson = function (data) {
        let res;
        // setting the explicitArray option prevents an array structure
        // where every node/element is always wrapped inside an array
        // set it to true, and see for yourself what changes
        xml2js.a.parseString(data, { explicitArray: false }, function (error, result) {
            if (error) {
                throw new Error(error);
            }
            else {
                res = result;
            }
        });
        return res;
    };
    ProductService.prototype.convertToXml = function (rootObject) {
        return new xml2js.a.Builder().buildObject(rootObject);
    };
    ;
    ProductService.prototype.getStyles = function (category) {
        let _this = this;
        let url = 'http://dev.summerwood.com/products/' + category + '/styles.xml';
        let headers = new Headers();
        headers.set('Accept', 'text/xml');
        // headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS') 
        // headers.append('Access-Control-Allow-Origin', '*')
        // headers.append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method")
        // headers.append('responseType', 'text')
        return this.http.get(url, { headers: headers })
            .map(function (res) {
            let data = _this.convertXMLToJson(res['_body']);
            return data['pulldowns']['style'];
        });
        // return[
        // 	{ id: 1, nameStyle: 'Copper Creek', thumbnail: '/assets/images/style_thumbnails/copper-creek.jpg', baseCategory: 1},
        // 	{ id: 5, nameStyle: 'Barside', thumbnail: '/assets/images/style_thumbnails/barside.jpg', baseCategory: 1},
        // 	{ id: 2, nameStyle: 'Bar Harbor', thumbnail: '/assets/images/style_thumbnails/bar-harbor.jpg', baseCategory: 1},
        // 	// { id: 4, nameStyle: 'Victorian', thumbnail: '/assets/images/style_thumbnails/victorian.jpg', baseCategory: 3},
        // 	{ id: 6, nameStyle: 'Sonoma', thumbnail: '/assets/images/style_thumbnails/sonoma.jpg', baseCategory: 1},
        // 	{ id: 3, nameStyle: 'Bala Bunkie', thumbnail: '/assets/images/style_thumbnails/bala-bunkie.jpg', baseCategory: 1,},
        // 	{ id: 1, nameStyle: 'Palmerston', thumbnail: '/assets/images/style_thumbnails/sonoma.jpg', baseCategory: 1,},
        // 	{ id: 1, nameStyle: 'Urban Studio', thumbnail: '/assets/images/style_thumbnails/urban-studio.jpg', baseCategory: 1,},
        // 	{ id: 1, nameStyle: 'Copper Creek', thumbnail: '/assets/images/style_thumbnails/copper-creek.jpg', baseCategory: 1,},
        // 	{ id: 1, nameStyle: 'Palmerston', thumbnail: '/assets/images/style_thumbnails/palmerston.jpg', baseCategory: 1},
        // 	{ id: 1, nameStyle: 'Sonoma', thumbnail: '/assets/images/style_thumbnails/sonoma.jpg', baseCategory: 1,},
        // 	{ id: 1, nameStyle: 'Urban Studio', thumbnail: '/assets/images/style_thumbnails/urban-studio.jpg', baseCategory: 1},
        //     { id: 1, nameStyle: 'Dune', thumbnail: '/assets/images/style_thumbnails/dune.jpg', baseCategory: 2},
        //     { id: 1, nameStyle: 'Telluride', thumbnail: '/assets/images/style_thumbnails/telluride.jpg', baseCategory: 2},
        //     { id: 1, nameStyle: 'Champlain', thumbnail: '/assets/images/style_thumbnails/champlain.jpg', baseCategory: 3},
        //     // { id: 1, nameStyle: 'Monterey', thumbnail: '/assets/images/style_thumbnails/Monterey.jpg', baseCategory: 3},
        //     { id: 1, nameStyle: 'Carlisle', thumbnail: '/assets/images/style_thumbnails/Carlisle.jpg', baseCategory: 3},
        //     { id: 1, nameStyle: 'Tatlle Creek', thumbnail: '/assets/images/style_thumbnails/Tatlle-Creek.jpg', baseCategory: 3},
        //     { id: 1, nameStyle: 'San Cristobal', thumbnail: '/assets/images/style_thumbnails/San-Cristobal.jpg', baseCategory: 3},
        //     // { id: 1, nameStyle: 'Coventry', thumbnail: '/assets/images/style_thumbnails/Coventry.jpg', baseCategory: 3},
        //     // { id: 1, nameStyle: 'Montpellier', thumbnail: '/assets/images/style_thumbnails/Montpellier.jpg', baseCategory: 3},
        //     { id: 1, nameStyle: 'Bali Tea House', thumbnail: '/assets/images/style_thumbnails/Bali-Tea-House.jpg', baseCategory: 3}
        // ];
    };
    ProductService.prototype.getProductConfiguration = function (id) {
        let _this = this;
        let url = 'http://dev.summerwood.com/products/configuration/' + id + '.xml';
        let headers = new Headers();
        return this.http.get(url, { headers: headers })
            .map(function (res) {
            let data = _this.convertXMLToJson(res['_body']);
            return data['shed'];
        });
    };
    ProductService.prototype.getStyleDetails = function (id) {
        // All sizes are inches
        let productData = {
            1: { nameStyle: 'cp_roof', thumbnail: '/assets/images/style_thumbnails/copper Creek.jpg', baseCategory: 1,
                width: 14, height: 7.375, depth: 8,
                roof: { id: 6666, name: 'Roof with shingles', order_code: 'roof1', type: 'roof', height: 78, width: 190, depth: 106 },
                dormer: { id: 66666, name: 'Dormer', order_code: 'dormer1', type: 'dormer', height: 4, width: 5.8 },
                sides: [
                    // Front wall
                    [
                        { id: 666, name: 'Wall 14x7.375 feet', type: 'wall', height: 7.375, width: 14 },
                        { 'id': 28, name: 'DD8 French 30-Lite Double Doors', order_code: 'DD8', opt_type: 103, left: 4.51, top: 1.625, type: 'door' },
                        { 'id': 8, 'name': 'W1 Standard fixed Window', 'order_code': 'W1', 'opt_type': 116, left: -60, top: 2, type: 'window' },
                        { 'id': 8, 'name': 'W1 Standard fixed Window', 'order_code': 'W1', 'opt_type': 116, left: 60, top: 2, type: 'window' }
                    ],
                    // Right wall
                    [
                        { id: 666, name: 'Wall 8x7.375 feet', type: 'wall', height: 7.375, width: 8 },
                    ],
                    // Back wall
                    [
                        { id: 666, name: 'Wall 14x7.375 feet', type: 'wall', height: 7.375, width: 14 },
                    ],
                    // Left wall
                    [
                        { id: 666, name: 'Wall 8x7.375 feet', type: 'wall', height: 7.375, width: 8 },
                        { 'id': 8, 'name': 'W9 10-Pane Sidelite Window', 'order_code': 'W9', 'opt_type': 116, left: 4.11, top: 2, type: 'window' }
                    ]
                ] },
            2: { nameStyle: 'Bar Harbor', thumbnail: '/assets/images/style_thumbnails/bar-harbor.jpg', baseCategory: 1,
                width: 8, height: 6.5, depth: 6,
                roof: { id: 6666, name: 'Roof with shingles', order_code: 'roof1', type: 'roof', height: 28, width: 103, depth: 90 },
                sides: [
                    // Front wall
                    [
                        { id: 666, name: 'Wall 14x7.375 feet', type: 'wall', order_code: 'bh_8x18_wall_front', height: 6.5, width: 8 },
                        { 'id': 28, name: 'D8 Single French 15-Lite Door', order_code: 'D4', opt_type: 103, left: 4.51, top: 1.625, type: 'door' },
                        { 'id': 8, 'name': 'W1 Standard fixed Window', 'order_code': 'W1', 'opt_type': 116, left: 1.51, top: 2, type: 'window' },
                    ],
                    // Right wall
                    [
                        { id: 666, name: 'Wall 8x7.375 feet', type: 'wall', height: 6.5, width: 6 },
                    ],
                    // Back wall
                    [
                        { id: 666, name: 'Wall 14x7.375 feet', type: 'wall', order_code: 'bh_8x18_wall_back', height: 6.5, width: 8 },
                    ],
                    // Left wall
                    [
                        { id: 666, name: 'Wall 8x7.375 feet', type: 'wall', height: 6.5, width: 6 },
                    ]
                ] },
            3: { nameStyle: 'Bala Bunkie', baseCategory: 1,
                sides: [
                    // Front wall
                    [
                        { id: 666, name: 'Wall 8 x 14 feet', type: 'wall', height: 7.75, width: 7.5 },
                        { id: 6666, name: 'Roof with shingles', order_code: 'roof1', type: 'roof', height: 3, width: 8.3 },
                        { id: 66666, name: 'Dormer', order_code: 'dormer1', type: 'dormer', height: 4, width: 6.2 },
                        { 'id': 28, name: 'D8 Single French 15-Lite Door', order_code: 'D8', opt_type: 103, left: 4.1, top: 1.625, type: 'door' },
                        { 'id': 2, 'name': 'W9 10-Pane Sidelite Window', 'order_code': 'W9', 'opt_type': 116, left: 1.1, top: 1.8, type: 'window' },
                    ],
                    // Right wall
                    [
                        { id: 666, name: 'Wall 8 x 14 feet', type: 'wall', height: 7.75, width: 8 },
                        { id: 6666, name: 'Roof with shingles', order_code: 'roof1', type: 'roof', height: 4, width: 9.8 },
                    ],
                    // Back wall
                    [
                        { id: 666, name: 'Wall 8 x 14 feet', type: 'wall', height: 7.75, width: 12.5 },
                        { id: 6666, name: 'Roof with shingles', order_code: 'roof1', type: 'roof', height: 4, width: 13.8 },
                    ],
                    // Left wall
                    [
                        { id: 666, name: 'Wall 8 x 14 feet', type: 'wall', height: 7.75, width: 8 },
                        { id: 6666, name: 'Roof with shingles', order_code: 'roof1', type: 'roof', height: 4, width: 9.8 },
                        { 'id': 8, 'name': 'W9 10-Pane Sidelite Window', 'order_code': 'W9', 'opt_type': 116, left: 4.11, top: 2, type: 'window' }
                    ]
                ] },
            5: { nameStyle: 'Barside', thumbnail: '/assets/images/style_thumbnails/barside.jpg', baseCategory: 1,
                width: 168, height: 88.5, depth: 88.5,
                roof: { id: 6666, name: 'Roof with shingles', order_code: 'roof1', type: 'roof', height: 78, width: 190, depth: 146, position: 'back' },
                terrace: { id: 66666, name: 'Terrace', order_code: 'barside', type: 'terrace', height: 78, width: 5.8 },
                sides: [
                    // Front wall
                    [
                        { id: 666, name: 'Wall 14x7.375 feet', type: 'wall', height: 7.375, width: 14 },
                        { 'id': 28, name: 'DD8 French 30-Lite Double Doors', order_code: 'DD8', opt_type: 103, left: 8, top: 1.8, type: 'door' },
                    ],
                    // Right wall
                    [
                        { id: 666, name: 'Wall 8x7.375 feet', type: 'wall', height: 7.375, width: 7.375 },
                    ],
                    // Back wall
                    [
                        { id: 666, name: 'Wall 14x7.375 feet', type: 'wall', height: 7.375, width: 14 },
                    ],
                    // Left wall
                    [
                        { id: 666, name: 'Wall 8x7.375 feet', type: 'wall', height: 7.375, width: 7.375 }
                    ]
                ] },
            4: { nameStyle: 'Victorian', baseCategory: 1,
                width: 106, height: 88.5, depth: 106,
                roof: { id: 6666, name: 'Roof with shingles', order_code: 'roof1', type: 'roof', height: 78, width: 106, depth: 106 },
                sides: [
                    // Front wall
                    [
                        { id: 666, name: 'Wall 8 x 14 feet', order_code: 'vg_10ft_wall', type: 'wall', height: 10, width: 10 },
                        { id: 6666, name: 'Roof with shingles', order_code: 'roof1', type: 'roof', height: 3, width: 8.3 },
                        { id: 66666, name: 'Dormer', order_code: 'dormer1', type: 'dormer', height: 4, width: 6.2 },
                    ],
                    // Right wall
                    [
                        { id: 666, name: 'Wall 8 x 14 feet', order_code: 'vg_10ft_wall', type: 'wall', height: 7.75, width: 8 },
                    ],
                    // Back wall
                    [
                        { id: 666, name: 'Wall 8 x 14 feet', order_code: 'vg_10ft_wall', type: 'wall', height: 7.75, width: 12.5 },
                    ],
                    // Left wall
                    [
                        { id: 666, name: 'Wall 8 x 14 feet', order_code: 'vg_10ft_wall', type: 'wall', height: 7.75, width: 8 },
                    ]
                ] },
            6: { nameStyle: 'Sonoma', thumbnail: '/assets/images/style_thumbnails/bar-harbor.jpg', baseCategory: 1,
                width: 144, height: 94.5, depth: 120,
                roof: { id: 6666, name: 'Roof with shingles', order_code: 'roof1', type: 'roof', height: 28, width: 103, depth: 90 },
                sides: [
                    // Front wall
                    [
                        { id: 666, name: 'Wall', type: 'wall', height: 7.875, width: 12 },
                        { 'id': 28, name: 'Door', order_code: 'MD9', opt_type: 103, left: 5.51, top: 1.625, type: 'door' },
                        { 'id': 8, 'name': 'Window', 'order_code': 'WV-P7', 'opt_type': 116, left: 1.51, top: 2, type: 'window' },
                    ],
                    // Right wall
                    [
                        { id: 666, name: 'Wall 8x7.375 feet', type: 'wall', height: 7.875, width: 10 },
                    ],
                    // Back wall
                    [
                        { id: 666, name: 'Wall 14x7.375 feet', type: 'wall', height: 7.875, width: 12 },
                    ],
                    // Left wall
                    [
                        { id: 666, name: 'Wall 8x7.375 feet', type: 'wall', height: 7.875, width: 10 },
                    ]
                ] },
        };
        return productData[id];
        // return Observable.create(observer => {
        //            observer.next(productData);
        //            observer.complete();
        //    });
    };
    ProductService.prototype.getProductStyleFromApi = function (id) {
        let _this = this;
        let products;
        return Observable.create(function (observer) {
            _this.http.get(_this.apiUrl + 'productStyleDetails?id=' + id)
                .subscribe(function (data) {
                products = data;
                observer.next(products);
                observer.complete();
            });
        });
    };
    ProductService.prototype.getCategories = function () {
        return [
            { id: 'pool-cabanas', name: 'Pool Cabanas' },
            { id: 'sheds', name: 'Garden Sheds' },
            // {id: 'gazebos', name: "Gazebos"},
            { id: 'workshops', name: 'Workshops' },
            { id: 'playhouses', name: 'Playhouses' },
            { id: 'spa-enclosures', name: 'Spa Enclosures' },
            { id: 'cabins', name: 'Cabins' },
            { id: 'home-studios', name: 'Home Studios' },
            { id: 'garages', name: 'Garages' }
        ];
    };
    ProductService.prototype.getSizes = function () {
        return [
            { value: '7x13', name: '7ft x 13ft $3,695.00' },
            { value: '8x15', name: '8ft x 15ft $3,695.00' },
            { value: '12x18', name: '12ft x 20ft $12,295.00' },
            { value: '12x20', name: '12ft x 20ft $12,295.00' },
            { value: '22x26', name: '22ft x 26ft $30,895.00' },
        ];
    };
    ProductService.prototype.getOptionsCategories = function () {
        return [
            { id: 116, name: 'Windows' },
            { id: 103, name: 'Doors' },
            // {id: 2, name: "Door Hardware"},
            // {id: 3, name: "Doors - Architects Choice"},
            // {id: 4, name: "Doors - Double"},
            // {id: 5, name: "Doors - Garage"},
            // {id: 6, name: "Doors - Metal"},
            // {id: 7, name: "Doors - Single"},
            { id: 110, name: 'Dormers' },
            // {id: 9, name: "Enhanced Siding Upgrade"},
            // {id: 10, name: "Finials"},
            // {id: 11, name: "Floors"},
            { id: 12, name: 'Flowerboxes' },
            // {id: 13, name: "Hardware"},
            // {id: 14, name: "Insulation"},
            // {id: 15, name: "Interior Options"},
            // {id: 16, name: "Pillasters and Pillars"},
            { id: 17, name: 'Ramps' },
            // {id: 18, name: "Rolling Shutters"}
            { id: 118, name: 'Shutters' },
            { id: 119, name: 'Roofing' },
            { id: 120, name: 'Accessories' }
        ];
    };
    ProductService.prototype.getSidingOptions = function () {
        let options = [{ 'id': 1, 'name': 'Cedar', 'order_code': 'cedar3', 'opt_type': 'siding', 'thumbnail': '/assets/thumbnails/wall/horizontal/cedar-7x12.png' },
            { 'id': 2, 'name': 'Canexel Acadia', 'order_code': 'canexel-acadia', 'opt_type': 'siding', 'thumbnail': '/assets/thumbnails/wall/horizontal/canexel-acadia.png' },
            { 'id': 3, 'name': 'Canexel Cliffside', 'order_code': 'canexel-cliffside', 'opt_type': 'siding', 'thumbnail': '/assets/thumbnails/wall/horizontal/canexel-cliffside.png' },
            { 'id': 3, 'name': 'Canexel Gold', 'order_code': 'canexel-autumn-gold', 'opt_type': 'siding', 'thumbnail': '/assets/thumbnails/wall/horizontal/canexel-autumn-gold.png' },
        ];
        return options;
    };
    ProductService.prototype.getTrimOptions = function () {
        let options = [{ 'id': 1, 'name': 'Cedar', 'order_code': 'cedar3', 'opt_type': 'siding', 'thumbnail': '/assets/thumbnails/wall/horizontal/cedar-7x12.png' },
            { 'id': 2, 'name': 'Canexel Acadia', 'order_code': 'canexel-acadia', 'opt_type': 'siding', 'thumbnail': '/assets/thumbnails/wall/horizontal/canexel-acadia.png' },
            { 'id': 3, 'name': 'Canexel Cliffside', 'order_code': 'canexel-cliffside', 'opt_type': 'siding', 'thumbnail': '/assets/thumbnails/wall/horizontal/canexel-cliffside.png' },
            { 'id': 3, 'name': 'Canexel Gold', 'order_code': 'canexel-autumn-gold', 'opt_type': 'siding', 'thumbnail': '/assets/thumbnails/wall/horizontal/canexel-autumn-gold.png' },
        ];
        return options;
    };
    ProductService.prototype.getCategoryOptions = function (categoryId) {
        // console.log('retrieving data from ' + this.apiUrl + '/option/optionsbycategory/' + categoryId );
        let options = {
            116: [
                { 'id': 17, 'name': 'BF1 Smallest Bifold Window', 'order_code': 'bf1', 'opt_type': 'window' },
                { 'id': 18, 'name': 'BF2 Small Bifold Window', 'order_code': 'BF2', 'opt_type': 'window' },
                { 'id': 19, 'name': 'BF3 Medium Bifold Window', 'order_code': 'BF3', 'opt_type': 'window' },
                { 'id': 20, 'name': 'BF4 Largest Bifold Window', 'order_code': 'BF4', 'opt_type': 'window' },
                { 'id': 61, 'name': 'CW1 Workshop Window', 'order_code': 'CW1', 'opt_type': 'window' },
                { 'id': 62, 'name': 'CW2 Large Workshop Window', 'order_code': 'CW2', 'opt_type': 'window' },
                { 'id': 1, 'name': 'W1 Standard Fixed Window', 'order_code': 'w1', 'opt_type': 'window', 'dragScope': 'wall' },
                { 'id': 2, 'name': 'W2 Opening Window', 'order_code': 'w2', 'opt_type': 'window', 'dragScope': 'wall' },
                { 'id': 3, 'name': 'W3 Bar Window', 'order_code': 'W3', 'opt_type': 'window', 'dragScope': 'wall' },
                { 'id': 4, 'name': 'W5-A Fan Arch Window (28"W x14"H)', 'order_code': 'w5', 'opt_type': 'window', 'dragScope': 'wall' },
                { 'id': 5, 'name': 'W6 4-Pane Arch Window', 'order_code': 'w6', 'opt_type': 'window', 'dragScope': 'wall' },
                { 'id': 6, 'name': 'W7 6-Pane Arch Window', 'order_code': 'w7', 'opt_type': 'window', 'dragScope': 'wall' },
                { 'id': 7, 'name': 'W8 8-Pane Arch Window', 'order_code': 'w8', 'opt_type': 'window', 'dragScope': 'wall' },
                { 'id': 8, 'name': 'W9 10-Pane Sidelite Window', 'order_code': 'w9', 'opt_type': 'window', 'dragScope': 'wall' },
                { 'id': 60, 'name': 'W10 9-Pane Picture Window', 'order_code': 'w10', 'opt_type': 'window', 'dragScope': 'wall' },
                { 'id': 136, 'name': 'W11 Large Fan Arch Window', 'order_code': 'w11', 'opt_type': 'window', 'dragScope': 'wall' },
                { 'id': 9, 'name': 'P1 Double Casement Window', 'order_code': 'P1', 'opt_type': 'window' },
                { 'id': 10, 'name': 'P2 Single Casement Window', 'order_code': 'P2', 'opt_type': 'window' },
                { 'id': 11, 'name': 'P3 Operating Sash Window', 'order_code': 'P3', 'opt_type': 'window' },
                { 'id': 12, 'name': 'P4 20-Pane Picture Window ', 'order_code': 'P4', 'opt_type': 'window' },
                { 'id': 12, 'name': 'P5', 'order_code': 'P5', 'opt_type': 'window' },
                { 'id': 12, 'name': 'P6', 'order_code': 'P6', 'opt_type': 'window' },
                { 'id': 66, 'name': 'P7 Opening Sidelite Sash Window', 'order_code': 'P7', 'opt_type': 'window' },
                { 'id': 13, 'name': 'SJ1 Smallest Sojo Slider', 'order_code': 'SJ1', 'opt_type': 'window' },
                { 'id': 14, 'name': 'SJ2 Small Sojo Slider Window', 'order_code': 'SJ2', 'opt_type': 'window' },
                { 'id': 15, 'name': 'SJ3 Medium Sojo Slider Window', 'order_code': 'SJ3', 'opt_type': 'window' },
                { 'id': 16, 'name': 'SJ4 Largest Sojo Slider Window', 'order_code': 'SJ4', 'opt_type': 'window' },
                { 'id': 95, 'name': 'PH1 Playhouse Window', 'order_code': 'PH1', 'opt_type': 'window' },
                { 'id': 99, 'name': 'T1 Transom Window', 'order_code': 'T1', 'opt_type': 'window' },
                { 'id': 142, 'name': 'P8 Arched Casement Window', 'order_code': 'P8', 'opt_type': 'window' },
                { 'id': 143, 'name': 'P9 Arched Opening Sash Window', 'order_code': 'P9', 'opt_type': 'window' },
                { 'id': 409, 'name': 'WD8 Large Panel Window', 'order_code': 'WD8', 'opt_type': 'window' },
                { 'id': 489, 'name': 'W5-C Fan Arch Window (36"W x 18"H)', 'order_code': 'W5-C', 'opt_type': 'window' },
                { 'id': 490, 'name': 'W5-B Fan Arch Window (32"W x 16"H)', 'order_code': 'W5-B', 'opt_type': 'window' },
                { 'id': 491, 'name': 'W5-AA Fan Arch Window (24"W x 12"H)', 'order_code': 'W5-AA', 'opt_type': 'window' },
                { 'id': 646, 'name': 'T1D Dune Transom Window', 'order_code': 'T1D', 'opt_type': 'window' },
                { 'id': 783, 'name': 'GH2 10\' San Cristobal Casement Window', 'order_code': 'GH2', 'opt_type': 'window' },
                { 'id': 784, 'name': 'GH3 12\' San Cristobal Casement Window', 'order_code': 'GH3', 'opt_type': 'window' },
                { 'id': 785, 'name': 'GH4 14\' San Cristobal Casement Window', 'order_code': 'GH4', 'opt_type': 'window' },
                { 'id': 786, 'name': 'GH5 16\' San Cristobal Casement Window', 'order_code': 'GH5', 'opt_type': 'window' },
                { 'id': 815, 'name': 'W9-NDL Sidelite Window (No Divided Lites)', 'order_code': 'W9-NDL', 'opt_type': 'window' },
            ],
            110: [
                { 'id': 1, 'name': 'Dormer1', 'order_code': 'Dormer', 'opt_type': 'dormer' },
            ],
            103: [
                { 'id': 21, 'name': 'D1 Standard Single Door', 'order_code': 'D1', 'opt_type': 'door' },
                { 'id': 782, 'name': 'D10', 'order_code': 'D10', 'opt_type': 'door' },
                { 'id': 782, 'name': 'D2 Single Dutch Door', 'order_code': 'D2', 'opt_type': 'door' },
                { 'id': 782, 'name': 'D3 Standard Double Doors', 'order_code': 'D3', 'opt_type': 'door' },
                { 'id': 782, 'name': 'D4 Arched Single Door', 'order_code': 'D4', 'opt_type': 'door' },
                { 'id': 782, 'name': 'D5 Double Arched Doors', 'order_code': 'D5', 'opt_type': 'door' },
                { 'id': 26, 'name': 'D6 Deluxe 9-Lite Single Door (34"W)', 'order_code': 'D6', 'opt_type': 'door' },
                { 'id': 782, 'name': 'D7 Solid Deluxe Single Door (34"W)', 'order_code': 'D7', 'opt_type': 'door' },
                { 'id': 782, 'name': 'D8 Single French 15-Lite Door', 'order_code': 'D8', 'opt_type': 'door' },
                { 'id': 814, 'name': 'D8 Single French Door (No divided lites)', 'order_code': 'D8-NDL', 'opt_type': 'door' },
                { 'id': 782, 'name': 'D9 French 20-Lite Double Doors', 'order_code': 'D9', 'opt_type': 'door' },
                { 'id': 30, 'name': 'D10 Double Solid Deluxe Doors', 'order_code': 'D10', 'opt_type': 'door' },
                { 'id': 31, 'name': 'D11 Deluxe Arched 9-Lite Single Door', 'order_code': 'D11', 'opt_type': 'door' },
                { 'id': 132, 'name': 'D12 Dbl Arched Deluxe 18-Lite Doors', 'order_code': 'D12', 'opt_type': 'door' },
                { 'id': 94, 'name': 'D13 Curved Double French 20-Lite Doors', 'order_code': 'D13', 'opt_type': 'door' },
                { 'id': 305, 'name': 'D3 Sliding Double Doors', 'order_code': 'D3S', 'opt_type': 'door' },
                { 'id': 782, 'name': 'D15', 'order_code': 'D15', 'opt_type': 'door' },
                { 'id': 140, 'name': 'DD6 Double Deluxe 18-Lite Doors', 'order_code': 'DD6', 'opt_type': 'door' },
                { 'id': 412, 'name': 'DD6-S Thin Double Deluxe Door', 'order_code': 'DD6-S', 'opt_type': 'door' },
                { 'id': 762, 'name': 'CD2 Concealed Single Door', 'order_code': 'CD2', 'opt_type': 'door' },
                { 'id': 763, 'name': 'D18 Door', 'order_code': 'D18', 'opt_type': 'door' },
                { 'id': 133, 'name': 'D19 Playhouse Dutch Door (25"W)', 'order_code': 'D19', 'opt_type': 'door' },
                { 'id': 304, 'name': 'Sliding D1 Door', 'order_code': 'D1S', 'opt_type': 'door' },
                { 'id': 141, 'name': 'DU6 Deluxe Dutch 9-Lite Single Door', 'order_code': 'DU6', 'opt_type': 'door' },
                { 'id': 141, 'name': '1/2 DR', 'order_code': '1_2_dr', 'opt_type': 'door' },
                { 'id': 731, 'name': 'SD4 Solid Cedar Arched Single Door', 'order_code': 'SD4', 'opt_type': 'door' },
                { 'id': 393, 'name': 'DD9', 'order_code': 'DD9', 'opt_type': 'door' },
                { 'id': 782, 'name': 'C4', 'order_code': 'C4', 'opt_type': 'door' },
                { 'id': 673, 'name': 'CD1 Concealed Double Doors', 'order_code': 'CD1', 'opt_type': 'door' },
                { 'id': 678, 'name': 'D9-NDL 50"W French Double Doors (No Divided Lites)', 'order_code': 'D9-NDL', 'opt_type': 'door' },
                { 'id': 597, 'name': 'DD20 Double Barn Loft Door', 'order_code': 'DD20', 'opt_type': 'door' },
                { 'id': 398, 'name': 'DD7 Full-size Double Solid Deluxe Doors', 'order_code': 'DD7', 'opt_type': 'door' },
                { 'id': 158, 'name': 'DD8 French 30-Lite Double Doors', 'order_code': 'DD8', 'opt_type': 'door' },
                { 'id': 593, 'name': 'SD9 Single French 10-Lite Door (25"W)', 'order_code': 'SD9', 'opt_type': 'door' },
                { 'id': 671, 'name': 'DD8-NDL French Double Doors (No Divided Lites)', 'order_code': 'DD8NDL', 'opt_type': 'door' },
                { 'id': 454, 'name': 'DSDD8 Sliding Full Sized Double French Doors', 'order_code': 'DSDD8', 'opt_type': 'door' },
                { 'id': 275, 'name': 'SDD8 Sliding French 30-Lite Double Doors', 'order_code': 'SDD8', 'opt_type': 'door' },
                { 'id': 679, 'name': 'SDD9', 'order_code': 'SDD9', 'opt_type': 'door' },
                { 'id': 679, 'name': 'SDD9-NDL Sliding Double French Doors (No Divided Lites)', 'order_code': 'SDD9-NDL', 'opt_type': 'door' }
            ],
            118: [
                { 'id': 782, 'name': 'DS_SF3', 'order_code': 'DS_SF3', 'opt_type': 'shutter' },
                { 'id': 782, 'name': 'SS1', 'order_code': 'SS1', 'opt_type': 'shutter' },
                { 'id': 782, 'name': 'SS2', 'order_code': 'SS2', 'opt_type': 'shutter' },
                { 'id': 782, 'name': 'SS3', 'order_code': 'SS3', 'opt_type': 'shutter' },
                { 'id': 782, 'name': 'SS4', 'order_code': 'SS4', 'opt_type': 'shutter' },
            ],
            119: [
                { 'id': 782, 'name': 'CU1 Palmerston Cupola Cedar', 'order_code': 'CU1', 'opt_type': 'roofing', 'description': 'This decorative cupola will fit any Palmerston or similar type roof that we offer' },
                { 'id': 782, 'name': 'CU1 Palmerston Cupola Copper Top', 'order_code': 'CU1-C', 'opt_type': 'roofing', 'description': '' },
                { 'id': 782, 'name': 'CU4 Windowed Cupola (coppertop)', 'order_code': 'CU2', 'opt_type': 'roofing', 'description': 'This decorative cupola will fit any Sonoma or similar style that we offer' },
                { 'id': 782, 'name': 'CU2 Sonoma Cupola ', 'order_code': 'CU2-C', 'opt_type': 'roofing', 'description': '' },
                { 'id': 782, 'name': 'CU4 Windowed Cupola (w/ Finial)', 'order_code': 'CU3-C', 'opt_type': 'roofing', 'description': '' },
            ],
            12: [
                { 'id': 782, 'name': 'TF5_2', 'order_code': 'TF5_2', 'opt_type': 'flowerbox', 'description': '' },
                { 'id': 782, 'name': 'AF3', 'order_code': 'AF3', 'opt_type': 'flowerbox', 'description': '' },
                { 'id': 782, 'name': 'AF4', 'order_code': 'AF4', 'opt_type': 'flowerbox', 'description': '' },
                { 'id': 782, 'name': 'AF5', 'order_code': 'AF5', 'opt_type': 'flowerbox', 'description': '' },
                { 'id': 782, 'name': 'TF3', 'order_code': 'TF3', 'opt_type': 'flowerbox', 'description': '' },
                { 'id': 782, 'name': 'TF4', 'order_code': 'TF4', 'opt_type': 'flowerbox', 'description': '' },
                { 'id': 782, 'name': 'TF5', 'order_code': 'TF5', 'opt_type': 'flowerbox', 'description': '' },
            ],
            17: [
                { 'id': 782, 'name': 'RP2', 'order_code': 'RP2', 'opt_type': 'ramp', 'description': '' },
                { 'id': 782, 'name': 'RP3', 'order_code': 'RP3', 'opt_type': 'ramp', 'description': '' },
            ],
            120: [
                { 'id': 782, 'name': 'Gazebo Benching', 'order_code': 'GB', 'opt_type': 'other', 'description': 'Gazebo Benching' },
                { 'id': 782, 'name': 'SH1', 'order_code': 'SH1', 'opt_type': 'other', 'description': 'Shelf' },
                { 'id': 782, 'name': 'V2', 'order_code': 'V2', 'opt_type': 'other', 'description': 'Vent 2' },
                { 'id': 782, 'name': 'V6', 'order_code': 'V6', 'opt_type': 'other', 'description': 'Vent 6' },
            ]
        };
        return Observable.create(function (observer) {
            observer.next(options[categoryId]);
            observer.complete();
        });
    };
    ProductService.prototype.getOptionDetails = function (optionId) {
        let options = {
            28: { 'id': 28, 'name': 'D8 Single French 15-Lite Door', 'order_code': 'D8', 'description': 'Crafted from premium western red cedar, our single French door introduces a new element of design. The door handle may be placed on the left or right during installation.', 'price_individual': 680, 'outside_dimensions': '35 3\/4"W x 73 1\/2"H', 'inside_dimensions': '28"W x 72"H', 'opt_type': 103, 'outside_width': 2.979165475, 'outside_height': 6.12499755, 'inside_width': 2.3333323999999998, 'inside_height': 5.9999976 },
            2: { 'id': 2, 'name': 'W2 Opening Window', 'order_code': 'W2', 'description': 'Our standard opening cedar window (opens inwards).', 'price_individual': 265, 'outside_dimensions': '22 1\/2"W x 34 1\/2"H', 'inside_dimensions': '22"W x 34"H', 'opt_type': 'window', 'outside_width': 1.87499925, 'outside_height': 2.87499885, 'inside_width': 1.5333325999999999, 'inside_height': 2.8333322 },
            3: { 'id': 3, 'name': 'W3 Bar Window', 'order_code': 'W3', 'description': 'Our stylishly crafted opening bar window. Great for serving drinks on those hot summer days.', 'price_individual': 500, 'outside_dimensions': '41 1\/2"W x 34 1\/2"H', 'inside_dimensions': '41"W x 34"H', 'opt_type': 'window', 'outside_width': 3.45833195, 'outside_height': 2.87499885, 'inside_width': 2.9, 'inside_height': 2.8 },
            5: { 'id': 5, 'name': 'W6 4-Pane Arch Window', 'order_code': 'W6', 'description': 'Our stylish 4 pane arch window is very popular in many design configurations.', 'price_individual': 410, 'outside_dimensions': '32 1\/2"W x 48 1\/2"H', 'inside_dimensions': '32"W x 48"H', 'opt_type': 'window', 'outside_width': 2.7083322499999998, 'outside_height': 4.04166505, 'inside_width': 2.6666656, 'inside_height': 3.9999984 },
            6: { 'id': 6, 'name': 'W7 6-Pane Arch Window', 'order_code': 'W7', 'description': 'This arch window looks great on our taller sheds or sheds with extra height. Combine with the SS3 storm shutters.', 'price_individual': 475, 'outside_dimensions': '32 1\/2"W x 72 1\/2"H', 'inside_dimensions': '32"W x 72"H', 'opt_type': 'window', 'outside_width': 2.7083322499999998, 'outside_height': 6.04166425, 'inside_width': 2.6666656, 'inside_height': 5.9999976 },
            7: { 'id': 7, 'name': 'W8 8-Pane Arch Window', 'order_code': 'W8', 'description': 'Our 8 pane arch window is a nice feature on smaller walls. Combine with the SS4 storm shutters to complete the look.', 'price_individual': 410, 'outside_dimensions': '24 1\/2"W x 57 1\/2"H', 'inside_dimensions': '24"W x 57"H', 'opt_type': 'window', 'outside_width': 2.04166585, 'outside_height': 4.79166475, 'inside_width': 1.9999992, 'inside_height': 4.7499981 },
            8: { 'id': 8, 'name': 'W9 10-Pane Sidelite Window', 'order_code': 'W9', 'description': 'Our 10 pane sidelite window is very popular; a natural on our five sided Catalina corner designs.', 'price_individual': 195, 'outside_dimensions': '17 1\/2"W x 57 1\/2"H', 'inside_dimensions': '17"W x 57"H', 'opt_type': 'window', 'outside_width': 1.45833275, 'outside_height': 4.79166475, 'inside_width': 1.4166661, 'inside_height': 4.7499981 },
            60: { 'id': 60, 'name': 'W10 9-Pane Picture Window', 'order_code': 'W10', 'description': 'The extra trim width gives our 9 pane picture window a bit of a historic look. Great on our Pioneer Barns and Telluride Workshops.', 'price_individual': 345, 'outside_dimensions': '33 1\/2"W x 33 1\/2"H', 'inside_dimensions': '33"W x 33"H', 'opt_type': 'window', 'outside_width': 2.79166555, 'outside_height': 2.79166555, 'inside_width': 2.7499989, 'inside_height': 2.7499989 },
        };
        return Observable.create(function (observer) {
            observer.next(options[optionId]);
            observer.complete();
        });
        // return this.http.get( this.apiUrl + '/option/optiondetails/' + optionId)
        //   .map((res:Response) => {
        //     return res['option'];
        // } );
    };
    ProductService.prototype.getWalls = function () {
        return [
            { id: 0, nameStyle: 'front', thumbnail: '/assets/images/style_thumbnails/copper-creek.jpg', baseCategory: 1,
                elemente: [
                    { id: 0, element_name: 'wall1', width: 13.3, height: 6.375, option_type: 'wall', image: '/assets/images/sonoma/perete_montat.jpg' },
                    { id: 1, element_name: 'wall_frame', width: 10.5, height: 8, option_type: 'wall_frame', image: '888.png' },
                    { id: 2, element_name: 'window-left', width: 1.875, height: 3.275, option_type: 'window', image: '/assets/images/sonoma/fereastra_montata.png' },
                    { id: 3, element_name: 'window-left-frame', width: 1.875, height: 2.875, option_type: 'window', image: '888.png' },
                    { id: 4, element_name: 'window-left-flowerbox', width: 2.5, height: 1.5, option_type: 'window', image: '/assets/images/sonoma/flowerbox1.png' },
                    { id: 5, element_name: 'left-shutters', width: 2, height: 4.8, option_type: 'window', image: '/assets/images/sonoma/shutters1.png' },
                    { id: 6, element_name: 'window-right', width: 1.875, height: 3.275, option_type: 'window', image: '/assets/images/sonoma/fereastra_montata.png' },
                    { id: 7, element_name: 'window-right-frame', width: 2, height: 4.8, option_type: 'window', image: '888.png' },
                    { id: 8, element_name: 'window-right-flowerbox', width: 2, height: 4.8, option_type: 'window', image: '/assets/images/sonoma/flowerbox1.png' },
                    { id: 9, element_name: 'right-shutters', width: 2, height: 4.8, option_type: 'window', image: '/assets/images/sonoma/shutters1.png' },
                    { id: 10, element_name: 'roof1', width: 11.8, height: 4, option_type: 'roof', image: '/assets/images/sonoma/acoperis_montat.png' },
                    { id: 11, element_name: 'roof_trim', width: 11.8, height: 1, option_type: 'window', image: '/assets/images/sonoma/shutters1.png88' },
                    { id: 12, element_name: 'dormer', width: 4, height: 3.3, option_type: 'dormer', image: '888.png' },
                    { id: 13, element_name: 'D6 Deluxe 9-Lite Single Door', width: 3.34, height: 6.125, option_type: 'door', image: '/assets/images/sonoma/usa_montata.png' },
                ] },
            { id: 1, nameStyle: 'right', thumbnail: '/assets/images/style_thumbnails/copper-creek.jpg', baseCategory: 1,
                elemente: [
                    { id: 0, element_name: 'wall1', width: 10.3, height: 6.375, option_type: 'wall', image: '/assets/images/sonoma/perete_montat.jpg' },
                    { id: 1, element_name: 'wall_frame', width: 10.5, height: 8, option_type: 'wall_frame', image: '888.png' },
                    { id: 2, element_name: 'window-left', width: 1.875, height: 3.275, option_type: 'window', image: '888.png' },
                    { id: 3, element_name: 'window-left-frame', width: 1.875, height: 2.875, option_type: 'window', image: '888.png' },
                    { id: 4, element_name: 'window-left-flowerbox', width: 2.5, height: 1.5, option_type: 'window', image: '888.png' },
                    { id: 5, element_name: 'left-shutters', width: 2, height: 4.8, option_type: 'window', image: '888.png' },
                    { id: 6, element_name: 'window-right', width: 1.875, height: 3.275, option_type: 'window', image: '/assets/images/sonoma/fereastra_montata.png' },
                    { id: 7, element_name: 'window-right-frame', width: 2, height: 4.8, option_type: 'window', image: '888.png' },
                    { id: 8, element_name: 'window-right-flowerbox', width: 2, height: 4.8, option_type: 'window', image: '/assets/images/sonoma/flowerbox1.png' },
                    { id: 9, element_name: 'right-shutters', width: 2, height: 4.8, option_type: 'window', image: '888.png' },
                    { id: 10, element_name: 'roof1', width: 11.8, height: 4, option_type: 'roof', image: '/assets/images/sonoma/acoperis_montat2.png' },
                    { id: 11, element_name: 'roof_trim', width: 11.8, height: 1, option_type: 'window', image: '888.png' },
                    { id: 12, element_name: 'dormer', width: 4, height: 3.3, option_type: 'dormer', image: '888.png' },
                    { id: 13, element_name: 'D6 Deluxe 9-Lite Single Door', width: 3.34, height: 6.125, option_type: 'door', image: '888.png' },
                ] },
            { id: 2, nameStyle: 'back', thumbnail: '/assets/images/style_thumbnails/copper-creek.jpg', baseCategory: 1,
                elemente: [
                    { id: 0, element_name: 'wall1', width: 13.3, height: 6.375, option_type: 'wall', image: '/assets/images/sonoma/perete_montat.jpg' },
                    { id: 1, element_name: 'wall_frame', width: 10.5, height: 8, option_type: 'wall_frame', image: '888.png' },
                    { id: 2, element_name: 'window-left', width: 1.875, height: 3.275, option_type: 'window', image: '888.png' },
                    { id: 3, element_name: 'window-left-frame', width: 1.875, height: 2.875, option_type: 'window', image: '888.png' },
                    { id: 4, element_name: 'window-left-flowerbox', width: 2.5, height: 1.5, option_type: 'window', image: '888.png' },
                    { id: 5, element_name: 'left-shutters', width: 2, height: 4.8, option_type: 'window', image: '888.png' },
                    { id: 6, element_name: 'window-right', width: 1.875, height: 3.275, option_type: 'window', image: '888.png' },
                    { id: 7, element_name: 'window-right-frame', width: 2, height: 4.8, option_type: 'window', image: '888.png' },
                    { id: 8, element_name: 'window-right-flowerbox', width: 2, height: 4.8, option_type: 'window', image: '888.png' },
                    { id: 9, element_name: 'right-shutters', width: 2, height: 4.8, option_type: 'window', image: '888.png' },
                    { id: 10, element_name: 'roof1', width: 11.8, height: 4, option_type: 'roof', image: '/assets/images/sonoma/acoperis_montat.png' },
                    { id: 11, element_name: 'roof_trim', width: 11.8, height: 1, option_type: 'window', image: '/assets/images/sonoma/shutters1.png88' },
                    { id: 12, element_name: 'dormer', width: 4, height: 3.3, option_type: 'dormer', image: '888.png' },
                    { id: 13, element_name: 'D6 Deluxe 9-Lite Single Door', width: 3.34, height: 6.125, option_type: 'door', image: '888.png' },
                ] },
            { id: 3, nameStyle: 'left', thumbnail: '/assets/images/style_thumbnails/copper-creek.jpg', baseCategory: 1,
                elemente: [
                    { id: 0, element_name: 'wall1', width: 10.3, height: 6.375, option_type: 'wall', image: '/assets/images/sonoma/perete_montat.jpg' },
                    { id: 1, element_name: 'wall_frame', width: 10.5, height: 8, option_type: 'wall_frame', image: '888.png' },
                    { id: 2, element_name: 'window-left', width: 1.875, height: 3.275, option_type: 'window', image: '888.png' },
                    { id: 3, element_name: 'window-left-frame', width: 1.875, height: 2.875, option_type: 'window', image: '888.png' },
                    { id: 4, element_name: 'window-left-flowerbox', width: 2.5, height: 1.5, option_type: 'window', image: '888.png' },
                    { id: 5, element_name: 'left-shutters', width: 2, height: 4.8, option_type: 'window', image: '888.png' },
                    { id: 6, element_name: 'window-right', width: 1.875, height: 3.275, option_type: 'window', image: '888.png' },
                    { id: 7, element_name: 'window-right-frame', width: 2, height: 4.8, option_type: 'window', image: '888.png' },
                    { id: 8, element_name: 'window-right-flowerbox', width: 2, height: 4.8, option_type: 'window', image: '888.png' },
                    { id: 9, element_name: 'right-shutters', width: 2, height: 4.8, option_type: 'window', image: '888.png' },
                    { id: 10, element_name: 'roof1', width: 11.8, height: 4, option_type: 'roof', image: '/assets/images/sonoma/acoperis_montat2.png' },
                    { id: 11, element_name: 'roof_trim', width: 11.8, height: 1, option_type: 'window', image: '888.png88' },
                    { id: 12, element_name: 'dormer', width: 4, height: 3.3, option_type: 'dormer', image: '888.png' },
                    { id: 13, element_name: 'D6 Deluxe 9-Lite Single Door', width: 3.34, height: 6.125, option_type: 'door', image: '888.png' },
                ] }
        ];
    };
    ProductService.prototype.getProducts = function () {
        return [
            { id: 1, nameStyle: 'Bala Bunkie', thumbnail: '/assets/images/style_thumbnails/bala-bunkie.jpg', baseCategory: 1,
                elemente: [
                    { id: 0, element_name: 'wall1', width: 2.5, height: 2.375, option_type: 'wall', image: '/assets/images/bala-bunkie/cedar-horizontal-120-inch.png' },
                    { id: 1, element_name: 'wall_frame', width: 4.5, height: 8, option_type: 'wall_frame', image: '/assets/images/bala-bunkie/trim-cedar-horizontal-120-inch.png' },
                    { id: 2, element_name: 'window-left', width: 1.875, height: 3.275, option_type: 'window', image: '/assets/images/sonoma/888.png' },
                    { id: 3, element_name: 'window-left-frame', width: 1.875, height: 2.875, option_type: 'window', image: '888.png' },
                    { id: 4, element_name: 'window-left-flowerbox', width: 2.5, height: 1.5, option_type: 'window', image: '/assets/images/sonoma/888.png' },
                    { id: 5, element_name: 'left-shutters', width: 2, height: 4.8, option_type: 'window', image: '/assets/images/sonoma/888.png' },
                    { id: 6, element_name: 'window-right', width: 1.875, height: 3.275, option_type: 'window', image: '/assets/images/sonoma/888.png' },
                    { id: 7, element_name: 'window-right-frame', width: 2, height: 4.8, option_type: 'window', image: '888.png' },
                    { id: 8, element_name: 'window-right-flowerbox', width: 2, height: 4.8, option_type: 'window', image: '/assets/images/sonoma/888.png' },
                    { id: 9, element_name: 'right-shutters', width: 2, height: 4.8, option_type: 'window', image: '/assets/images/sonoma/888.png' },
                    { id: 10, element_name: 'roof1', width: 11.8, height: 4, option_type: 'roof', image: '/assets/images/bala-bunkie/font-roof.png' },
                    { id: 11, element_name: 'roof_trim', width: 11.8, height: 1, option_type: 'window', image: '/assets/images/sonoma/888.png' },
                    { id: 12, element_name: 'dormer', width: 4, height: 3.3, option_type: 'dormer', image: '888.png' },
                    { id: 13, element_name: 'D6 Deluxe 9-Lite Single Door', width: 3.34, height: 6.125, option_type: 'door', image: '/assets/images/sonoma/888.png' },
                ] },
            { id: 1, nameStyle: 'Sonoma', thumbnail: '/assets/images/style_thumbnails/copper-creek.jpg', baseCategory: 1,
                elemente: [
                    { id: 0, element_name: 'wall1', width: 13.3, height: 6.375, option_type: 'wall', image: '/assets/images/sonoma/perete_montat.jpg' },
                    { id: 1, element_name: 'wall_frame', width: 10.5, height: 8, option_type: 'wall_frame', image: '888.png' },
                    { id: 2, element_name: 'window-left', width: 1.875, height: 3.275, option_type: 'window', image: '/assets/images/sonoma/fereastra_montata.png' },
                    { id: 3, element_name: 'window-left-frame', width: 1.875, height: 2.875, option_type: 'window', image: '888.png' },
                    { id: 4, element_name: 'window-left-flowerbox', width: 2.5, height: 1.5, option_type: 'window', image: '/assets/images/sonoma/flowerbox1.png' },
                    { id: 5, element_name: 'left-shutters', width: 2, height: 4.8, option_type: 'window', image: '/assets/images/sonoma/shutters1.png' },
                    { id: 6, element_name: 'window-right', width: 1.875, height: 3.275, option_type: 'window', image: '/assets/images/sonoma/fereastra_montata.png' },
                    { id: 7, element_name: 'window-right-frame', width: 2, height: 4.8, option_type: 'window', image: '888.png' },
                    { id: 8, element_name: 'window-right-flowerbox', width: 2, height: 4.8, option_type: 'window', image: '/assets/images/sonoma/flowerbox1.png' },
                    { id: 9, element_name: 'right-shutters', width: 2, height: 4.8, option_type: 'window', image: '/assets/images/sonoma/shutters1.png' },
                    { id: 10, element_name: 'roof1', width: 11.8, height: 4, option_type: 'roof', image: '/assets/images/sonoma/acoperis_montat.png' },
                    { id: 11, element_name: 'roof_trim', width: 11.8, height: 1, option_type: 'window', image: '/assets/images/sonoma/shutters1.png88' },
                    { id: 12, element_name: 'dormer', width: 4, height: 3.3, option_type: 'dormer', image: '888.png' },
                    { id: 13, element_name: 'D6 Deluxe 9-Lite Single Door', width: 3.34, height: 6.125, option_type: 'door', image: '/assets/images/sonoma/usa_montata.png' },
                ] },
            { id: 2, nameStyle: 'Copper Creek', thumbnail: '/assets/images/style_thumbnails/palmerston.jpg', baseCategory: 1,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 15.3, height: 8, option_type: 'wall', image: '/assets/images/cedar_log_3.png' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png1' },
                    { id: 3, element_name: 'window-left', width: 1.85, height: 4.8, option_type: 'window', image: '/assets/images/fereastra2.png' },
                    { id: 4, element_name: 'window-right', width: 1.85, height: 4.8, option_type: 'window', image: '/assets/images/fereastra2.png' },
                    { id: 5, element_name: 'roof1', width: 17.4, height: 3.2, option_type: 'roof', image: '/assets/images/cedar_shingle_1.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png1' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door2.png' },
                ] },
            { id: 3, nameStyle: 'Palmerston', thumbnail: '/assets/images/style_thumbnails/sonoma.jpg', baseCategory: 1,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door.png' },
                ] },
            { id: 1, nameStyle: 'Urban Studio', thumbnail: '/assets/images/style_thumbnails/urban-studio.jpg', baseCategory: 1,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra2.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra2.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door2.png' },
                ] },
            { id: 1, nameStyle: 'Copper Creek', thumbnail: '/assets/images/style_thumbnails/copper-creek.jpg', baseCategory: 1,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door.png' },
                ] },
            { id: 1, nameStyle: 'Palmerston', thumbnail: '/assets/images/style_thumbnails/palmerston.jpg', baseCategory: 1,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra2.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra2.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door2.png' },
                ] },
            { id: 1, nameStyle: 'Sonoma', thumbnail: '/assets/images/style_thumbnails/sonoma.jpg', baseCategory: 1,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door.png' },
                ] },
            { id: 1, nameStyle: 'Urban Studio', thumbnail: '/assets/images/style_thumbnails/urban-studio.jpg', baseCategory: 1,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door.png' },
                ] },
            { id: 1, nameStyle: 'Dune', thumbnail: '/assets/images/style_thumbnails/dune.jpg', baseCategory: 2,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door.png' },
                ] },
            { id: 1, nameStyle: 'Telluride', thumbnail: '/assets/images/style_thumbnails/telluride.jpg', baseCategory: 2,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door.png' },
                ] },
            { id: 1, nameStyle: 'Champlain', thumbnail: '/assets/images/style_thumbnails/champlain.jpg', baseCategory: 3,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door.png' },
                ] },
            { id: 1, nameStyle: 'Victorian', thumbnail: '/assets/images/style_thumbnails/victorian.jpg', baseCategory: 3,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door.png' },
                ] },
            { id: 1, nameStyle: 'Monterey', thumbnail: '/assets/images/style_thumbnails/Monterey.jpg', baseCategory: 3,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door.png' },
                ] },
            { id: 1, nameStyle: 'Carlisle', thumbnail: '/assets/images/style_thumbnails/Carlisle.jpg', baseCategory: 3,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door.png' },
                ] },
            { id: 1, nameStyle: 'Tatlle Creek', thumbnail: '/assets/images/style_thumbnails/Tatlle-Creek.jpg', baseCategory: 3,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door.png' },
                ] },
            { id: 1, nameStyle: 'San Cristobal', thumbnail: '/assets/images/style_thumbnails/San-Cristobal.jpg', baseCategory: 3,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door.png' },
                ] },
            { id: 1, nameStyle: 'Coventry', thumbnail: '/assets/images/style_thumbnails/Coventry.jpg', baseCategory: 3,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door.png' },
                ] },
            { id: 1, nameStyle: 'Montpellier', thumbnail: '/assets/images/style_thumbnails/Montpellier.jpg', baseCategory: 3,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door.png' },
                ] },
            { id: 1, nameStyle: 'Bali Tea House', thumbnail: '/assets/images/style_thumbnails/Bali-Tea-House.jpg', baseCategory: 3,
                elemente: [
                    { id: 1, element_name: 'wall1', width: 13.3, height: 8, option_type: 'wall', image: '/assets/images/peretelemn.jpg' },
                    { id: 2, element_name: 'wall_frame', width: 14, height: 8, option_type: 'wall_frame', image: '/assets/images/wall_frame.png' },
                    { id: 3, element_name: 'window-left', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 4, element_name: 'window-right', width: 1.55, height: 4.8, option_type: 'window', image: '/assets/images/fereastra.png' },
                    { id: 5, element_name: 'roof1', width: 14.8, height: 3.2, option_type: 'roof', image: '/assets/images/acoperis.png' },
                    { id: 6, element_name: 'dormer', width: 4, height: 3.3, option_type: 'roof', image: '/assets/images/dormer.png' },
                    { id: 7, element_name: 'door1', width: 3.446, height: 6.125, option_type: 'roof', image: '/assets/images/front_door.png' },
                ] },
        ];
    };
    ProductService = __decorate([
        Injectable(),
        __metadata('design:paramtypes', 'Http')
    ], ProductService);
    return ProductService
}());
}
