import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnInit
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
// tslint:disable
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';
import { HttpModule, Http, Headers } from '@angular/http';
import { productStyle } from './product-style';
import { categorySlider } from './category-slider.component';
import { optionsCategorySlider } from './options-categories-slider.component';
import { productOptionsSlider } from './product-options-slider.component';
import { ProductService } from './product.service';
import { UtilitiesService } from './utilities.service';
// import * as THREE from 'three';
declare var require: any;
const OBJLoader = require('three-obj-loader');
const MTLLoader = require('three-mtl-loader');
const THREE = require('three');
const OrbitControls = require('three-orbitcontrols');
import DragControls from 'drag-controls';
DragControls.install({ THREE });
import { SceneUtils } from 'three-full';

@Component({
  templateUrl: 'app.component.html',
  selector: 'my-app',
  styleUrls: ['app.component.css'],
  providers: [ProductService],
  animations: [
    trigger('stylesDrawertrigger', [
      state(
        'inactive',
        style({
          transform: 'translateY(19vh)'
        })
      ),
      state(
        'active',
        style({
          transform: 'translateY(0)'
        })
      ),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]),
    trigger('optionsDrawertrigger', [
      state(
        'inactive',
        style({
          left: '-25%'
        })
      ),
      state(
        'active',
        style({
          left: '15%'
        })
      ),
      transition('inactive => active', animate('400ms ease-in')),
      transition('active => inactive', animate('400ms ease-out'))
    ]),
    trigger('sidingsDrawertrigger', [
      state(
        'inactive',
        style({
          left: '-25%'
        })
      ),
      state(
        'active',
        style({
          left: '15%'
        })
      ),
      transition('inactive => active', animate('400ms ease-in')),
      transition('active => inactive', animate('400ms ease-out'))
    ]),
    trigger('trimDrawertrigger', [
      state(
        'inactive',
        style({
          left: '-25%'
        })
      ),
      state(
        'active',
        style({
          left: '15%'
        })
      ),
      transition('inactive => active', animate('400ms ease-in')),
      transition('active => inactive', animate('400ms ease-out'))
    ])
  ]
})
export class AppComponent {
  scene = new THREE.Scene();
  sceneBg = new THREE.Scene();
  sceneWallMask = new THREE.Scene();
  sceneRoofMask = new THREE.Scene();
  sceneRoof = new THREE.Scene();
  sceneRoofOptions = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ antialias: true });
  controls = new OrbitControls(this.camera, this.renderer.domElement);
  raycaster = new THREE.Raycaster();
  mouse = { clientX: 0, clientY: 0, layerX: 0, layerY: 0 };
  intersects;
  cameraAngle;
  helperPlane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(500, 500, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );

  testSphere = new THREE.Mesh(
    new THREE.SphereGeometry( 5, 32, 32 ),
    new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} )
  ); 

  numberOfSides;
  selectedElement = null;
  draggingStartedAt = null;
  dragControls;
  draggedObject;
  highlights = [];
  percentComplete = 0;
  skyBox;
  currentBackground = 'pool';
  userBackground;
  initialPosition;

  @ViewChild('container', { static: false }) elementRef: ElementRef;
  public container: HTMLElement;
  // cube: THREE.Mesh;
  shinglesMaterial = new THREE.MeshLambertMaterial({
    flatShading: true,
    map: THREE.ImageUtils.loadTexture('../assets/shingles.jpg'),
    reflectivity: 0.1
  });
  cedarMaterial = new THREE.MeshLambertMaterial({
    flatShading: true,
    map: THREE.ImageUtils.loadTexture('../assets/cedar.jpg'),
    reflectivity: 0.1
  });
  elementsCedarMaterial = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    map: THREE.ImageUtils.loadTexture(
      '../assets/' + 'cedar' + '.jpg'
    ),
    transparent: false,
    flatShading: true
  });
  btnMaterialRed = new THREE.LineBasicMaterial({
    color: 0xff0000,
    linewidth: 1,
    linecap: 'round',
    linejoin: 'round'
  });
  selectedMaterial = new THREE.LineBasicMaterial({
    color: 0xff0000,
    linewidth: 1,
    transparent: true,
    opacity: 0.5,
    linecap: 'round',
    linejoin: 'round'
  });
  materialCedarSiding;
  materialCedarElement;

  selectedCategory = 'pool-cabanas';
  productCategories;
  productStyles;
  selectedConfiguration: any = {
    side1: {},
    side2: {},
    side3: {},
    side4: {},
    style: {
      barSize: '',
      order_type: 'pc',
      primaryTrim: '',
      roofMaterial: 'shingles_cedar',
      secondaryTrim: '',
      styleCategory: 'pool-cabanas',
      styleDW: '10x16',
      styleHeight: '88.5',
      styleID: '1',
      styleName: 'Palmerston',
      styleOverhang: '6',
      styleSiding: ''
    }
  };
  optionsCategories;
  selectedOptionsCategory = 'windows';
  selectedStyle: any = {
    $: { id: '1' },
    depthwidth: [{ $: { id: '754' } }],
    description: '',
    includedoptions: '',
    overhang: [{ $: { name: '' } }],
    roofangle: '30',
    roofstyle: 'gable',
    wallheight: [{ $: { type: '' } }]
  };
  selectedOverhang;
  availableOptions;
  sidingOptions;
  trimOptions;
  buildingOptions = [[], [], [], [], []];
  sidingOrientation = 'horizontal';
  currentWall: number;
  sidingIsNumber;
  stylesDrawerState: string;
  optionsDrawerState: string = 'inactive';
  sidingsDrawerState: string = 'inactive';
  trimDrawerState: string = 'inactive';
  btnDelete = new THREE.Object3D();
  btnMove = new THREE.Object3D();
  tmp;
  feetToPx = 75;
  topPositionFullHd = 400;
  glassMaterial;
  textureCube;
  currentWallName: string;
  wall_image = 0;
  building_size: string = '';
  wall_sizes = [];
  viewport = { width: 0, height: 0, top: 0, left: 0 };
  background_top = 0;
  wall_boundary = [];
  constructor(
    private _productService: ProductService,
    private _utils: UtilitiesService,
    private http: Http
  ) {}
  ngOnInit() {
    this.selectedCategory = 'pool-cabanas';
    this.wall_sizes = this._productService.getSizes();
    this.building_size = this.wall_sizes[0].value;
    this.currentWall = 0;
    this.productCategories = this._productService.getCategories();
    this._productService.getStyles(this.selectedCategory).subscribe(
      st => {
        this.selectedStyle = st[0];
        if (!Array.isArray(st[0].overhang)) {
          this.selectedStyle.overhang = [st[0].overhang];
        }
        this._productService
          .getProductConfiguration(this.selectedStyle.$.defaultConfig)
          .subscribe(res => {
            this.selectedConfiguration = res;
            if (!Array.isArray(res.general.option)) {
              this.selectedConfiguration.general.option = [res.general.option];
            }
            console.log('Initial selected product', res);
            // this.createGround();
            this.loadNewBuilding();
            this.addCubeMap();
          });
      },
      err => {
        console.log('Error loading styles' + err);
      }
    );
    this.optionsCategories = this._productService.getOptionsCategories();
    this.sidingOptions = this._productService.getSidingOptions();
    this.trimOptions = this._productService.getTrimOptions();
    this.setViewport();
  }
  ngAfterViewInit() {
    this.container = this.elementRef.nativeElement;
    this.init3DScene();
  }
  loadNewBuilding() {
    var building = this.selectedConfiguration.style.styleDW.split('x');
    this.selectedConfiguration['width'] = Number(building[1]);
    this.selectedConfiguration['depth'] = Number(building[0]);
    this.selectedConfiguration['height'] =
      Number(this.selectedConfiguration.style.styleHeight) / 12;
    this.selectedConfiguration['cdcCustomData'] = {
      wallsHeightRatio: 1,
      roofRatio: { scaleWidth: 1, scaleHeight: 1, scaleDepth: 1 }
    };
    console.log('Building depth ', this.selectedConfiguration.depth);
    console.log('Loading style ', this.selectedStyle);
    console.log('Loading default configuration ', this.selectedConfiguration);
    this.loadBasicStructure().then(
      res => {
        console.log(res + 'Now lets load the roof');
        this.loadRoof().then(() => {
          console.log('Finished loading ROOF');
          this.loadStyleBasicOptions().then(
            result => {
              this.alignEvenly(0);
              if (this.selectedStyle.$.name === 'Glen Echo') {
                this.loadGlenEchoAccesorry();
              }
              if (this.selectedStyle.$.name === 'Windsor') {
                this.loadWindsorColumns();
              }
              if (this.selectedStyle.$.name === 'Barside') {
                this.loadTerraceOption();
              }
              this.loadRoofingOptions();
            },
            err => {
              alert('Error while loading Style Options' + err);
            }
          );
        });
      },
      err => {
        console.log('Error', err);
      }
    );
  }
  loadBasicStructure() {
    console.log('loading basic structure');
    const specialConfigurations = ['Catalina'];
    let self: AppComponent = this;
    if (self.selectedStyle.$.name === 'Catalina') {
      return self.loadBasicStructureCatalina();
    } else {
      let promise = new Promise(function(resolve, reject) {
        for (let i = 0; i < self.selectedStyle.$.sides; i++) {
          let rotation = 0;
          let filename = self.selectedConfiguration.width + 'ftx7.875ft';
          switch (i) {
            case 1:
              rotation = 270;
              filename = self.selectedConfiguration.depth + 'ftx7.875ft';
              break;
            case 2:
              rotation = 180;
              filename = self.selectedConfiguration.width + 'ftx7.875ft';
              break;
            case 3:
              rotation = 90;
              filename = self.selectedConfiguration.depth + 'ftx7.875ft';
              break;
          }
          let position = self.calculateWallPosition(i);
          self.loadWall('wall-' + i, filename, position, rotation).then(() => {
            if (i === self.selectedStyle.$.sides - 1) {
              resolve('Success: ');
            }
          });
        }
      });
      return promise;
    }
  }
  loadBasicStructureCatalina() {
    let self: AppComponent = this;
    console.log('CATALINA STYLE', self.selectedStyle);
    let promise = new Promise(function(resolve, reject) {
      for (let i = 0; i < self.selectedStyle.$.sides; i++) {
        let rotation = 0;
        let position = {};
        position['x'] = 0;
        position['y'] = 0 - (self.selectedConfiguration.height * 12) / 2;
        position['z'] = 0;
        let filename = self.selectedConfiguration.depth + 'ftx7.875ft';
        switch (i) {
          case 1:
            rotation = 288;
            position['x'] = -((self.selectedConfiguration.depth / 1.5) * 12);
            position['z'] = -((self.selectedConfiguration.depth / 2) * 12);
            break;
          case 2:
            rotation = 216;
            position['x'] = (-self.selectedConfiguration.depth / 2.5) * 12;
            position['z'] = -self.selectedConfiguration.depth * 1.2 * 12;
            break;
          case 3:
            rotation = 144;
            position['x'] = (self.selectedConfiguration.depth / 2.5) * 12;
            position['z'] = -self.selectedConfiguration.depth * 1.2 * 12;
            break;
          case 4:
            rotation = 72;
            position['x'] = (self.selectedConfiguration.depth / 1.5) * 12;
            position['z'] = (-self.selectedConfiguration.depth / 2) * 12;
            break;
        }
        self.loadWall('wall-' + i, filename, position, rotation).then(() => {
          if (i === self.selectedStyle.$.sides - 1) {
            resolve('Success: ');
          }
        });
      }
    });
    return promise;
  }
  calculateWallPosition(side) {
    let extraHeight = 0;
    if (this.roofIsFlat()) {
      extraHeight = this.calculateActualRoofHeight() / 12;
    }
    let position = {};
    switch (side) {
      case 0:
        position['x'] = 0;
        position['y'] =
          0 - ((this.selectedConfiguration.height - extraHeight) * 12) / 2;
        position['z'] = 0;
        break;
      case 1:
        position['x'] = 0 - (this.selectedConfiguration.width * 12) / 2;
        position['y'] =
          0 - ((this.selectedConfiguration.height - extraHeight) * 12) / 2;
        position['z'] = 0 - (this.selectedConfiguration.depth * 12) / 2;
        break;
      case 2:
        position['x'] = 0;
        position['y'] =
          0 - ((this.selectedConfiguration.height - extraHeight) * 12) / 2;
        position['z'] = 0 - this.selectedConfiguration.depth * 12;
        break;
      case 3:
        position['x'] = (this.selectedConfiguration.width * 12) / 2;
        position['y'] =
          0 - ((this.selectedConfiguration.height - extraHeight) * 12) / 2;
        position['z'] = 0 - (this.selectedConfiguration.depth * 12) / 2;
        break;
    }
    return position;
  }
  loadWall(name, filename, position, rotation) {
    let self: AppComponent = this;
    var manager = new THREE.LoadingManager();
    var loader = new THREE.OBJLoader(manager);
    let promise = new Promise(function(resolve, reject) {
      var mtlLoader = new MTLLoader();
      mtlLoader.setPath('../assets/models/wall/');
      mtlLoader.load(filename + '.mtl', function(materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setPath('../assets/models/wall/');
        objLoader.setMaterials(materials);
        objLoader.load(
          filename + '.obj',
          function(object) {
            object.name = name;
            var scaleHeight;
            if (self.roofIsFlat()) {
              let actualRoofHeight = self.calculateActualRoofHeight() / 12;
              scaleHeight =
                self.selectedConfiguration.height / 7.875 +
                actualRoofHeight / 7.875;
              self.selectedConfiguration.cdcCustomData.wallsHeightRatio = scaleHeight;
            } else {
              scaleHeight = self.selectedConfiguration.height / 7.875;
            }
            object.scale.set(1, scaleHeight, 1);
            object.position.x = position.x;
            object.position.y = position.y;
            object.position.z = position.z;
            object.rotation.set(0, THREE.Math.degToRad(rotation), 0);
            self.scene.add(object);
            resolve('Success: ');
          },
          function(xhr) {
            self.percentComplete = Math.round((xhr.loaded / xhr.total) * 100);
          },
          function(error) {
            console.log('An error happened');
          }
        );
      });
    });
    return promise;
  }
  loadAccessories() {
    console.log('Loading accesssories');
    let self: AppComponent = this;
    let filename = 'table';
    let promise = new Promise(function(resolve, reject) {
      var mtlLoader = new MTLLoader();
      mtlLoader.setPath('/assets/models/accessories/');
      mtlLoader.load(filename + '.mtl', function(materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setPath('/assets/models/accessories/');
        objLoader.setMaterials(materials);
        objLoader.load(
          filename + '.obj',
          function(object) {
            object.name = 'accessory';
            let xxx = new THREE.Box3().setFromObject(object);
            object.scale.set(0.35, 0.35, 0.35);
            object.position.x = -(self.selectedConfiguration.width / 1.5);
            object.position.y = -(self.selectedConfiguration.width / 2);
            object.position.z = 15;
            object.rotation.y = THREE.Math.degToRad(330);
            console.log('Accessories loaded', object);
            self.scene.add(object);
          },
          function(xhr) {
            self.percentComplete = Math.round((xhr.loaded / xhr.total) * 100);
            console.log(self.percentComplete + '% loaded');
          },
          function(error) {
            console.log('An error happened');
          }
        );
      });
      resolve('Success: ');
    });
    return promise;
  }
  loadRoof() {
    let self: AppComponent = this;
    let filename = this.selectedConfiguration.style.styleName;
    let promise = new Promise(function(resolve, reject) {
      var mtlLoader = new MTLLoader();
      mtlLoader.setPath('../assets/models/roof/');
      mtlLoader.load(filename + '.mtl', function(materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setPath('../assets/models/roof/');
        objLoader.setMaterials(materials);
        objLoader.load(
          filename + '.obj',
          function(object) {
            object.name = 'roof';
            object.renderOrder = 0;
            let objSize = self.objectSize(object);
            let actualWidth = self.calculateActualWidth();
            let actualDepth = self.calculateActualDepth();
            let scaleHeight = 1;
            if (
              self.selectedStyle.roofstyle === 'gable' &&
              self.selectedStyle.$.name !== 'Barside'
            ) {
              let actualHeight = self.calculateActualRoofHeight();
              scaleHeight = actualHeight / objSize.y;
            }
            let scaleWidth = actualWidth / objSize.x;
            let scaleDepth = actualDepth / objSize.z;
            object.scale.set(scaleWidth, scaleHeight, scaleDepth);
            objSize = self.objectSize(object);
            object.position.y = objSize.y / 2;
            if (
              self.selectedStyle.$.rooftype === 'ab,1' ||
              self.selectedStyle.$.name === 'Barside'
            ) {
              object.position.z = -(
                self.selectedConfiguration.depth * 12 -
                objSize.z / 2 +
                Number(self.selectedConfiguration.style.styleOverhang)
              );
            } else {
              object.position.z = -(
                (self.selectedConfiguration.depth * 12) /
                2
              );
            }
            self.sceneRoof.add(object);
            self.loadWallMask(object.position, objSize);
            resolve('Success: ');
          },
          function(xhr) {
            self.percentComplete = Math.round((xhr.loaded / xhr.total) * 100);
            console.log('Roof ' + self.percentComplete + '% loaded');
          },
          function(error) {
            console.log('An error happened');
          }
        );
      });
    });
    return promise;
  }
  calculateActualRoofHeight() {
    let self: AppComponent = this;
    let deg2rad = Math.PI / 180;
    let actualWidth = self.calculateActualWidth();
    let x = actualWidth;
    let y = self.selectedStyle.roofangle * deg2rad;
    let actualHeight = (actualWidth / 2) * Math.tan(y);
    actualHeight = Math.abs(actualHeight);
    return actualHeight;
  }
  calculateActualDepth() {
    let self: AppComponent = this;
    let roofTypeMultiplier = 1;
    if (
      self.selectedStyle.$.rooftype === 'ab,1' ||
      self.selectedStyle.$.name === 'Barside'
    ) {
      roofTypeMultiplier = 1.4;
    }
    let actualDepth;
    if (self.selectedStyle.$.name === 'Catalina') {
      actualDepth =
        self.selectedConfiguration.depth * 2 * 12 * roofTypeMultiplier +
        Number(self.selectedConfiguration.style.styleOverhang) * 1.2;
    } else {
      actualDepth =
        self.selectedConfiguration.depth * 12 * roofTypeMultiplier +
        Number(self.selectedConfiguration.style.styleOverhang) * 1.2;
    }
    return actualDepth;
  }
  calculateActualWidth() {
    let self: AppComponent = this;
    let actualWidth;
    if (self.selectedStyle.$.name === 'Catalina') {
      actualWidth =
        self.selectedConfiguration.depth * 2 * 12 +
        Number(self.selectedConfiguration.style.styleOverhang) * 1.2;
    } else {
      actualWidth =
        self.selectedConfiguration.width * 12 +
        Number(self.selectedConfiguration.style.styleOverhang) * 1.2;
    }
    return actualWidth;
  }
  loadWallMask(position, objSize) {
    let self: AppComponent = this;
    var objLoader = new THREE.OBJLoader();
    objLoader.setPath('../assets/models/wallmasks/');
    const filename = self.selectedStyle.$.name + '.obj';
    let roof = self.sceneRoof.getObjectByName('roof');
    objLoader.load(
      filename,
      function(object) {
        object.name = 'wall_mask';
        let objectSize = self.objectSize(object);
        object.traverse(function(child) {
          if (child instanceof THREE.Mesh) {
            child.material = self.selectedMaterial;
          }
        });
        let scaleHeight = self.objectSize(roof).y / objectSize.y;
        let scaleWidth = (self.selectedConfiguration.width * 12) / objectSize.x;
        let scaleDepth = (self.selectedConfiguration.depth * 12) / objectSize.z;
        object.scale.set(
          scaleWidth + 0.06,
          scaleHeight + 0.03,
          scaleDepth + 0.06
        );
        let roofPos = roof.getWorldPosition();
        object.position.x = roofPos.x;
        object.position.y = roofPos.y;
        object.position.z = roofPos.z;
        self.sceneWallMask.add(object);
      },
      self.onProgress,
      self.onError
    );
  }
  loadStyleBasicOptions() {
    if (this.selectedConfiguration.side1.dormer) {
      if (this.selectedConfiguration.side1.dormer.length) {
        this.loadTwoDormers();
      } else {
        this.loadDormerOption();
      }
    }
    let self: AppComponent = this;
    this.buildingOptions = [[], [], [], [], []];
    let promise = new Promise((resolve, reject) => {
      this.loadStyleBasicOptionsFromSide(0).then(res => {
        this.buildingOptions[0].push(res);
        this.loadStyleBasicOptionsFromSide(1).then(res => {
          this.buildingOptions[1].push(res);
          this.loadStyleBasicOptionsFromSide(2).then(res => {
            this.buildingOptions[2].push(res);
            this.loadStyleBasicOptionsFromSide(3).then(res => {
              this.buildingOptions[3].push(res);
              if (self.selectedStyle.$.sides === 5) {
                this.loadStyleBasicOptionsFromSide(4).then(res => {
                  this.buildingOptions[4].push(res);
                  resolve(this.buildingOptions);
                });
              } else {
                resolve(this.buildingOptions);
              }
            });
          });
        });
      });
    });

    return promise;
  }

  loadStyleBasicOptionsFromSide(side) {
    side++;
    let self: AppComponent = this;
    let buildingOptions = [];
    let options = [];
    let totalOptions;
    console.log(
      'Side: ' + side + ' Total options: ' + totalOptions,
      self.selectedConfiguration['side' + side].option
    );
    if (!self.selectedConfiguration['side' + side].option) {
      totalOptions = 0;
    } else if (!self.selectedConfiguration['side' + side].option.length) {
      totalOptions = 1;
      options.push(this.selectedConfiguration['side' + side].option);
    } else {
      totalOptions = self.selectedConfiguration['side' + side].option.length;
      options = self.selectedConfiguration['side' + side].option;
    }
    let optionsProcessed = 0;
    let promise = new Promise((resolve, reject) => {
      if (totalOptions === 0) {
        resolve();
      } else {
        for (let i = 0; i < totalOptions; i++) {
          let element = options[i];
          switch (element.itemClass) {
            case 'window':
              self
                .loadWindowOption(
                  side - 1,
                  element.ordercode,
                  element.hPosition
                )
                .then(loadedWindow => {
                  let shutters = self.getElementAccessories(
                    side,
                    'shutter',
                    element.position
                  );
                  if (shutters) {
                    self.loadNewBuildingWindowShutters(
                      loadedWindow,
                      shutters.ordercode
                    );
                  }
                  let flowerbox = self.getElementAccessories(
                    side,
                    'flowerbox',
                    element.position
                  );
                  if (flowerbox) {
                    self.loadNewBuildingWindowFlowerbox(
                      loadedWindow,
                      flowerbox.ordercode
                    );
                  }

                  buildingOptions.push(loadedWindow);
                  optionsProcessed++;
                  if (optionsProcessed === totalOptions) {
                    resolve(buildingOptions);
                  }
                });
              break;

            case 'door':
              console.log(
                '[loadStyleBasicOptionsFromSide] Loading ' + element.itemClass
              );
              self
                .loadDoorOption(
                  'wall-' + (side - 1),
                  element.ordercode,
                  element.hPosition
                )
                .then(loadedDoor => {
                  buildingOptions.push(loadedDoor);
                  optionsProcessed++;
                  if (optionsProcessed === totalOptions) {
                    resolve(buildingOptions);
                  }
                });
              break;

            default:
              console.log(
                '[loadStyleBasicOptionsFromSide] Ignore loading ' +
                  element.itemClass
              );
              optionsProcessed++;
              if (optionsProcessed === totalOptions) {
                resolve(buildingOptions);
              }
              break;
          }
        }
      }
    });
    return promise;
  }
  getElementAccessories(sideNo, accType, position) {
    let self: AppComponent = this;
    for (
      let j = 1;
      j <= self.selectedConfiguration['side' + sideNo].option.length;
      j++
    ) {
      if (self.selectedConfiguration['side' + sideNo].option[j]) {
        let element = self.selectedConfiguration['side' + sideNo].option[j];
        if (element.itemClass === accType && element.position === position) {
          return element;
        }
      }
    }
  }
  loadNewBuildingWindowShutters(targetObject, ordercode) {
    let self: AppComponent = this;
    let targetSize = self.objectSize(targetObject);
    var mtlLoader = new MTLLoader();
    mtlLoader.setPath('../assets/models/shutter/');
    mtlLoader.load(ordercode.toLowerCase() + '_left.mtl', function(materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setPath('../assets/models/shutter/');
      objLoader.setMaterials(materials);
      objLoader.load(
        ordercode.toLowerCase() + '_left.obj',
        function(object) {
          object.name = 'shutter-left';
          object.position.x = -targetSize.x / 2;
          object.position.y = -targetSize.y / 2;
          targetObject.add(object);
        },
        self.onProgress,
        self.onError
      );
    });
    mtlLoader.load(ordercode.toLowerCase() + '_right.mtl', function(materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setPath('../assets/models/shutter/');
      objLoader.setMaterials(materials);
      objLoader.load(
        ordercode.toLowerCase() + '_right.obj',
        function(object) {
          object.name = 'shutter-right';
          object.position.x = targetSize.x / 2;
          object.position.y = -targetSize.y / 2;
          targetObject.add(object);
        },
        self.onProgress,
        self.onError
      );
    });
  }
  loadNewBuildingWindowFlowerbox(targetObject, ordercode) {
    let self: AppComponent = this;
    let targetSize = self.objectSize(targetObject);
    var mtlLoader = new MTLLoader();
    mtlLoader.setPath('../assets/models/flowerbox/');
    mtlLoader.load(ordercode.toLowerCase() + '.mtl', function(materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setPath('../assets/models/flowerbox/');
      objLoader.setMaterials(materials);
      objLoader.load(
        ordercode.toLowerCase() + '.obj',
        function(object) {
          object.name = 'flowerbox';
          object.position.y = -targetSize.y / 2;
          targetObject.add(object);
        },
        self.onProgress,
        self.onError
      );
    });
  }
  onProgress(xhr) {
    this.percentComplete = Math.round((xhr.loaded / xhr.total) * 100);
  }
  onError(xhr) {
    console.log('Error', xhr);
  }
  loadTerraceOption() {
    console.log('Loading terrace');
    let self: AppComponent = this;
    let firstWall = self.scene.getObjectByName('wall-0');
    let wallPosition = firstWall.getWorldPosition();
    let wallSize = self.objectSize(firstWall);

    var mtlLoader = new MTLLoader();
    mtlLoader.setPath('../assets/models/terrace/');
    mtlLoader.load('barside.mtl', function(materials) {
      materials.preload();

      var objLoader = new THREE.OBJLoader();
      objLoader.setPath('../assets/models/terrace/');

      objLoader.setMaterials(materials);
      objLoader.load(
        'barside.obj',
        function(object) {
          let objSize = self.objectSize(object);
          let scaleWidth = wallSize.x / objSize.x;
          let scaleHeight = wallSize.y / objSize.y;
          object.scale.set(scaleWidth, scaleHeight, 1);

          object.name = 'terrace';
          object.position.x = wallPosition.x;
          object.position.y = wallPosition.y;
          object.position.z = wallPosition.z + objSize.z / 2;

          self.scene.add(object);
        },
        self.onProgress,
        self.onError
      );
    });
  }

  loadGlenEchoAccesorry() {
    console.log('Loading Glen Echo Accessory');
    let self: AppComponent = this;

    let firstWall = self.scene.getObjectByName('wall-0');
    let wallPosition = firstWall.getWorldPosition();
    let wallSize = self.objectSize(firstWall);

    var mtlLoader = new MTLLoader();
    mtlLoader.setPath('../assets/models/accessories/');
    mtlLoader.load('glen_echo_roof_accessory.mtl', function(materials) {
      materials.preload();

      var objLoader = new THREE.OBJLoader();
      objLoader.setPath('../assets/models/accessories/');

      objLoader.setMaterials(materials);
      objLoader.load(
        'glen_echo_roof_accessory.obj',
        function(object) {
          let objSize = self.objectSize(object);
          object.name = 'roof-accessory';
          object.position.x = wallPosition.x - wallSize.x / 2;
          object.position.y = wallPosition.y + wallSize.y / 2 - objSize.y / 2;
          object.position.z = wallPosition.z + objSize.z / 2;
          self.scene.add(object);
        },
        self.onProgress,
        self.onError
      );

      objLoader.setMaterials(materials);
      objLoader.load(
        'glen_echo_roof_accessory.obj',
        function(object) {
          let objSize = self.objectSize(object);
          object.name = 'roof-accessory';
          object.position.x = wallPosition.x + wallSize.x / 2;
          object.position.y = wallPosition.y + wallSize.y / 2 - objSize.y / 2;
          object.position.z = wallPosition.z + objSize.z / 2;
          self.scene.add(object);
        },
        self.onProgress,
        self.onError
      );
    });
  }

  loadWindsorColumns() {
    console.log('Loading Glen Echo Accessory');
    let self: AppComponent = this;

    let firstWall = self.scene.getObjectByName('wall-0');
    let wallPosition = firstWall.getWorldPosition();
    let wallSize = self.objectSize(firstWall);
    let roof = self.sceneRoof.getObjectByName('roof');
    let roofPosition = roof.getWorldPosition();
    let roofSize = self.objectSize(roof);

    var mtlLoader = new MTLLoader();
    mtlLoader.setPath('../assets/models/accessories/');
    mtlLoader.load('windsor_column.mtl', function(materials) {
      materials.preload();

      var objLoader = new THREE.OBJLoader();
      objLoader.setPath('../assets/models/accessories/');

      objLoader.setMaterials(materials);
      objLoader.load(
        'windsor_column.obj',
        function(object) {
          let objSize = self.objectSize(object);
          object.name = 'column-left';
          object.position.x = roofPosition.x - roofSize.x / 2 + objSize.x;
          object.position.y = wallPosition.y + wallSize.y / 2 - objSize.y / 2;
          object.position.z = roofPosition.z + roofSize.z / 2 - objSize.z / 2;
          self.scene.add(object);
        },
        self.onProgress,
        self.onError
      );

      objLoader.load(
        'windsor_column.obj',
        function(object) {
          let objSize = self.objectSize(object);
          object.name = 'column-center1';
          object.position.x = wallPosition.x - wallSize.x / 6;
          object.position.y = wallPosition.y + wallSize.y / 2 - objSize.y / 2;
          object.position.z = roofPosition.z + roofSize.z / 2 - objSize.z / 2;
          self.scene.add(object);
        },
        self.onProgress,
        self.onError
      );

      objLoader.load(
        'windsor_column.obj',
        function(object) {
          let objSize = self.objectSize(object);
          object.name = 'column-center2';
          object.position.x = wallPosition.x + wallSize.x / 6;
          object.position.y = wallPosition.y + wallSize.y / 2 - objSize.y / 2;
          object.position.z = roofPosition.z + roofSize.z / 2 - objSize.z / 2;
          self.scene.add(object);
        },
        self.onProgress,
        self.onError
      );

      objLoader.load(
        'windsor_column.obj',
        function(object) {
          let objSize = self.objectSize(object);
          object.name = 'column-right';
          object.position.x = roofPosition.x + roofSize.x / 2 - objSize.x;
          object.position.y = wallPosition.y + wallSize.y / 2 - objSize.y / 2;
          object.position.z = roofPosition.z + roofSize.z / 2 - objSize.z / 2;
          self.scene.add(object);
        },
        self.onProgress,
        self.onError
      );
    });
  }

  alignEvenly(sideNo) {
    let self: AppComponent = this;

    let options = [];
    let noOfOptions = this.buildingOptions[sideNo][0].length;
    for (let i = 0; i < noOfOptions; i++) {
      let element = this.buildingOptions[sideNo][0][i];
      if (element.name.indexOf('left') != -1) {
        options[0] = element;
      }
      if (element.name.indexOf('center') != -1) {
        options[1] = element;
      }
      if (element.name.indexOf('right') != -1) {
        options[this.buildingOptions[sideNo][0].length - 1] = element;
      }
    }

    let wall = this.scene.getObjectByName('wall-' + sideNo);
    let wallSize = this.objectSize(wall);
    let optionsSize;
    console.log('Wall size', wallSize.x);
    this.calculateSpaceOpccupiedByOptions(options).then(res => {
      optionsSize = res;
      let spaceBetweenOptions = Math.abs(
        (wallSize.x - optionsSize) / (noOfOptions + 1)
      );
      let currentPosition = 0 - wallSize.x / 2;
      for (let i = 0; i < options.length; i++) {
        let objectSize = this.objectSize(options[i]);
        currentPosition += spaceBetweenOptions + objectSize.x / 2;
        options[i].position.x = currentPosition;
        currentPosition += objectSize.x / 2;
      }
    });
  }

  calculateSpaceOpccupiedByOptions(options) {
    let self: AppComponent = this;
    let promise = new Promise(function(resolve, reject) {
      let totalWidth = 0;
      for (let i = 0; i < options.length; i++) {
        totalWidth += self.objectSize(options[i]).x;
      }
      resolve(totalWidth);
    });
    return promise;
  }

  roofIsFlat() {
    let res = false;
    if (
      this.selectedStyle.$.name === 'Bar Harbor' ||
      this.selectedStyle.$.name === 'Urban Studio' ||
      this.selectedStyle.$.name === 'Dune'
    ) {
      res = true;
    }
    return res;
  }

  dragObject(event) {
    let localMouse = new THREE.Vector2();
    localMouse.x =
      (event.layerX / this.renderer.domElement.clientWidth) * 2 - 1;
    localMouse.y =
      -(event.layerY / this.renderer.domElement.clientHeight) * 2 + 1;

    this.raycaster.setFromCamera(localMouse, this.camera);

    let parent = this.scene.getObjectByName('wall-' + this.currentWall);
    let intersects = this.raycaster.intersectObjects(parent.children, true);
    let objSize = this.objectSize(this.selectedElement);
    let parentPosition = parent.getWorldPosition();
    let targetBox = new THREE.Box3().setFromObject(parent);
    let parentSize = this.objectSize(parent);

    this.tmp = intersects[0].point.x;
  }

  onCanvasMouseMove(event) {}
  onCanvasClickDown(event) {
    const self: AppComponent = this;
    this.mouse = event;
    let intersects;
    let localMouse = new THREE.Vector2();
    localMouse.x =
      (event.layerX / this.renderer.domElement.clientWidth) * 2 - 1;
    localMouse.y =
      -(event.layerY / this.renderer.domElement.clientHeight) * 2 + 1;
    this.raycaster.setFromCamera(localMouse, this.camera);

    intersects = this.raycaster.intersectObjects(this.scene.children, true);
    let clickedObject = intersects[1].object.parent;
    console.log('Clicked object: ', clickedObject.name);

    if (
      intersects.length !== 0 &&
      (clickedObject.name.includes('door') ||
        clickedObject.name.includes('window'))
    ) {
      if (this.selectedElement) {
        this.removeObjectTransparency(this.selectedElement);
      }
      this.selectedElement = clickedObject;
      this.addObjectTransparency(this.selectedElement);
    } else {
      this.controls.enabled = true;
      this.selectedElement = null;
      this.removeObjectTransparency(this.selectedElement);
      this.draggingStartedAt = null;
    }
  }

  onCanvasClickUp(event) {
    this.controls.enabled = true;
    if (this.selectedObjectColidesWithOthers()) {
      this.selectedElement.position.x = this.draggingStartedAt.x;
      this.selectedElement.position.y = this.draggingStartedAt.y;
    }
    this.draggingStartedAt = null;
  }

  isWithinBoundsOf(object, target) {
    let res = false;
    let objectBox = new THREE.Box3().setFromObject(object);
    let targetBox = new THREE.Box3().setFromObject(target);
    if (
      objectBox.min.x >= targetBox.min.x &&
      objectBox.max.x <= targetBox.max.x
    ) {
      res = true;
    }
    return res;
  }

  selectedObjectColidesWithOthers() {
    let collisionDetected = null;

    if (!this.selectedElement) {
      return null;
    }
    let el = this.selectedElement;
    var originPoint = el.position.clone();
    el['size'] = this.objectSize(el);
    let wallElements = this.scene.getObjectByName('wall-' + this.currentWall);

    let objectBox = new THREE.Box3().setFromObject(el);

    wallElements.children.forEach(we => {
      let weBox = new THREE.Box3().setFromObject(we);
      if (
        we.uuid !== el.uuid &&
        !we.name.includes('planks') &&
        !we.name.includes('trim_') &&
        weBox.intersectsBox(objectBox)
      ) {
        console.log('Object intersected with ' + we.name);
        collisionDetected = true;
      }
    });

    return collisionDetected;
  }

  startDraggingOption($event, option) {
    this.draggedObject = option;
  }

  highlightTargets(option) {
    let targets = [];
    let target;
    let parent;
    if (this.highlights.length === 0) {
      switch (option.opt_type) {
        case 'dormer':
          target = this.scene.getObjectByName('roof');
          this.highlights.push(this.highlightObject(target));
          break;

        case 'shutter':
          parent = this.scene;
          targets = this.getAllObjectsWithName('window', parent);
          targets.forEach(target => {
            this.highlights.push(this.highlightObject(target));
          });

        case 'flowerbox':
          parent = this.scene;
          targets = this.getAllObjectsWithName('window', parent);
          targets.forEach(target => {
            this.highlights.push(this.highlightObject(target));
          });
          break;

        default:
          break;
      }
    }
  }

  highlightObject(target) {
    const outlineMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.2
    });
    let highlight = target.clone();
    highlight.traverse(obj => {
      if (obj instanceof THREE.Mesh) {
        obj.material = outlineMaterial;
      }
    });
    highlight.scale.multiplyScalar(1.05);
    target.parent.add(highlight);
    return highlight;
  }

  removeHighlights() {
    this.highlights.forEach(h => {
      h.parent.remove(h);
    });
    this.highlights = [];
  }

  getAllObjectsWithName(name, parent) {
    console.log('parent', parent);
    let res = [];
    parent.children.forEach(ch => {
      if (ch.name.includes(name)) {
        res.push(ch);
        console.log('found one! ', ch);
      } else {
        console.log(ch.name + ' is not ' + name);
      }
    });
    return res;
  }

  droppedOption($event, dragData) {
    const self: AppComponent = this;
    const localMouse = new THREE.Vector2();
    localMouse.x =
      ($event.layerX / this.renderer.domElement.clientWidth) * 2 - 1;
    localMouse.y =
      -($event.layerY / this.renderer.domElement.clientHeight) * 2 + 1;
    this.raycaster.setFromCamera(localMouse, this.camera);

    if (this.highlights.length !== 0) {
      let placedCorrectly = false;

      console.log('Drag data', self.draggedObject);
      for (let highlight of this.highlights) {
        let intersects = this.raycaster.intersectObjects(
          highlight.children,
          true
        );
        console.log('Intesrsects', intersects);
        if (intersects.length !== 0) {
          placedCorrectly = true;
          switch (self.draggedObject.opt_type) {
            case 'flowerbox':
              this.loadFlowerboxOption(
                highlight,
                self.draggedObject.order_code
              );
              break;

            case 'shutter':
              this.loadShutterOption(highlight, self.draggedObject.order_code);
              break;

            default:
              break;
          }
        }
      }
      if (!placedCorrectly) {
        alert('You should place this on highlighted object');
      }
    } else {
      this.loadDroppedOption($event, dragData, this.scene);
    }
  }

  loadDroppedOption($event, object, targetObject) {
    const self: AppComponent = this;
    const localMouse = new THREE.Vector2();
    localMouse.x =
      ($event.layerX / this.renderer.domElement.clientWidth) * 2 - 1;
    localMouse.y =
      -($event.layerY / this.renderer.domElement.clientHeight) * 2 + 1;
    this.raycaster.setFromCamera(localMouse, this.camera);

    const targetSize = self.objectSize(targetObject);

    const intersects = this.raycaster.intersectObjects(
      targetObject.children,
      true
    );
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath('../assets/models/' + self.draggedObject.opt_type + '/');
    mtlLoader.load(
      self.draggedObject.order_code.toLowerCase() + '.mtl',
      materials => {
        materials.preload();

        const objLoader = new THREE.OBJLoader();
        objLoader.setPath(
          '../assets/models/' + self.draggedObject.opt_type + '/'
        );

        objLoader.setMaterials(materials);
        objLoader.load(
          self.draggedObject.order_code.toLowerCase() + '.obj',
          object => {
            object.name = name;

            object.position.x = 0;
            object.position.y = 0;
            object.position.z = 3.08;

            targetObject.add(object);
          },
          xhr => {
            self.percentComplete = Math.round((xhr.loaded / xhr.total) * 100);
            console.log(self.percentComplete + '% loaded');
          },
          error => {
            console.log('An error happened');
          }
        );
      }
    );
  }

  allowDrop(event) {
    event.preventDefault();
  }

  init3DScene() {
    let view = {
      angle: 45,
      aspect: screen.width / screen.height,
      near: 0.1,
      far: 1000
    };

    // LIGHTS
    var ambientLight = new THREE.AmbientLight(0xffffff);
    var directionalLight1 = new THREE.DirectionalLight(0xc0c090);
    var directionalLight2 = new THREE.DirectionalLight(0xc0c090);
    var directionalLight3 = new THREE.DirectionalLight(0xc0c090);
    var directionalLight4 = new THREE.DirectionalLight(0xc0c090);

    directionalLight1.position.set(-100, -50, 100);
    directionalLight2.position.set(100, 50, -100);
    directionalLight3.position.set(100, -50, -100);
    directionalLight3.intensity = 0.5;
    directionalLight4.position.set(-100, 50, 100);
    directionalLight4.intensity = 0.5;
    ambientLight.position.set(0, 200, 0);
    ambientLight.intensity = 1;

    this.scene.add(directionalLight1);
    this.scene.add(directionalLight2);
    this.scene.add(directionalLight3);
    this.scene.add(directionalLight4);
    this.scene.add(ambientLight);

    // sceneRoof lights
    var ambientLight2 = new THREE.AmbientLight(0x404040);
    var directionalLight2_1 = new THREE.DirectionalLight(0xc0c090);
    var directionalLight2_2 = new THREE.DirectionalLight(0xc0c090);
    var directionalLight2_3 = new THREE.DirectionalLight(0xc0c090);
    var directionalLight2_4 = new THREE.DirectionalLight(0xc0c090);

    directionalLight2_1.position.set(-100, -50, 100);
    directionalLight2_2.position.set(100, 50, -100);
    directionalLight2_3.position.set(100, -50, -100);
    directionalLight2_3.intensity = 0.5;
    directionalLight2_4.position.set(-100, 50, 100);
    directionalLight2_4.intensity = 0.5;

    this.sceneRoof.add(directionalLight2_1);
    this.sceneRoof.add(directionalLight2_2);
    this.sceneRoof.add(directionalLight2_3);
    this.sceneRoof.add(directionalLight2_4);
    this.sceneRoof.add(ambientLight2);

    // sceneRoofOptions lights
    var ambientLight3 = new THREE.AmbientLight(0x404040);
    var directionalLight3_1 = new THREE.DirectionalLight(0xc0c090);
    var directionalLight3_2 = new THREE.DirectionalLight(0xc0c090);
    var directionalLight3_3 = new THREE.DirectionalLight(0xc0c090);
    var directionalLight3_4 = new THREE.DirectionalLight(0xc0c090);

    directionalLight3_1.position.set(-100, -50, 100);
    directionalLight3_2.position.set(100, 50, -100);
    directionalLight3_3.position.set(100, -50, -100);
    directionalLight3_3.intensity = 0.5;
    directionalLight3_4.position.set(-100, 50, 100);
    directionalLight3_4.intensity = 0.5;

    this.sceneRoofOptions.add(directionalLight3_1);
    this.sceneRoofOptions.add(directionalLight3_2);
    this.sceneRoofOptions.add(directionalLight3_3);
    this.sceneRoofOptions.add(directionalLight3_4);
    this.sceneRoofOptions.add(ambientLight3);

    this.camera.position.set(0.0, 0.0, 200.0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.camera);

    this.renderer.setSize(this.viewport.width, this.viewport.height);
    this.renderer.sortObjects = true;
    this.renderer.autoClear = false;
    this.renderer.setClearColor(0xEEEEEE);

    
    this.container.appendChild(this.renderer.domElement);

    var r = '../assets/threetextures/cube/' + this.currentBackground + '/';
    var urls = [
      r + 'posx.jpg',
      r + 'negx.jpg',
      r + 'posy.jpg',
      r + 'negy.jpg',
      r + 'posz.jpg',
      r + 'negz.jpg'
    ];
    this.textureCube = new THREE.CubeTextureLoader().load(urls);
    this.textureCube.mapping = THREE.CubeRefractionMapping;

    this.createMaterials();
    this.glassMaterial = new THREE.MeshPhongMaterial({
      color: 0xccddff,
      envMap: this.textureCube,
      flatShading: true,
      refractionRatio: 0.98,
      reflectivity: 0.3
    });

    this.helperPlane.visible = false;
    this.scene.add(this.helperPlane);
    this.scene.add(this.testSphere);

    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = true;
    this.controls.maxPolarAngle = Math.PI / 2; //Don't let to go below the ground

    this.render();
  }

  createGround() {
    var texture = new THREE.TextureLoader().load('../assets/textures/grass.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    let groundMaterial = new THREE.MeshLambertMaterial({
      flatShading: true,
      map: texture,
      reflectivity: 0.1
    });
    var groundGeometry = new THREE.CubeGeometry(800, 5, 800);
    let ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.name = 'ground';
    ground.position.y = -Number(this.selectedConfiguration.style.styleHeight);
    console.log('Ground position ' + ground.position.y);
    this.scene.add(ground);
  }

  createMaterials() {
    this.createMaterialCedarSiding();
    this.createMaterialCedarElement();
  }

  createMaterialCedarSiding() {
    var texture = new THREE.TextureLoader().load('../assets/textures/cedar3.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    this.materialCedarSiding = new THREE.MeshLambertMaterial({
      flatShading: true,
      map: texture,
      reflectivity: 0.1
    });
  }
  createMaterialCedarElement() {
    var texture = new THREE.TextureLoader().load(
      '../assets/textures/cedar-element.jpg'
    );
    this.materialCedarElement = new THREE.MeshLambertMaterial({
      flatShading: true,
      map: texture,
      reflectivity: 0.1
    });
  }

  addCubeMap() {
    var skyGeometry = new THREE.CubeGeometry(1024, 1024, 1024);

    let directions = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'];

    var materialArray = [];
    for (var i = 0; i < 6; i++)
      materialArray.push(
        new THREE.MeshBasicMaterial({
          map: THREE.ImageUtils.loadTexture(
            '../assets/threetextures/cube/' +
              this.currentBackground +
              '/' +
              directions[i] +
              '.jpg'
          ),
          side: THREE.BackSide
        })
      );
    var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    skyBox.name = 'skybox';
    this.sceneBg.add(skyBox);
  }

  changeBackground() {
    console.log('Changing background to ' + this.currentBackground);
    let box = this.scene.getObjectByName('skybox');
    this.sceneBg.remove(box);

    this.addCubeMap();
  }

  changeSidingsTexture(objectName, newTexture) {
    let self: AppComponent = this;

    for (let i = 1; i <= self.selectedStyle.$.sides; i++) {
      let textureName = newTexture.order_code;
      var texture = new THREE.TextureLoader().load(
        '../assets/textures/' + textureName + '.jpg'
      );
      texture.repeat.set(1, 1);

      let sidingMaterial = new THREE.MeshLambertMaterial({
        flatShading: true,
        map: texture,
        reflectivity: 0.1
      });

      let newMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        reflectivity: 0.1
      });
      var object = this.scene.getObjectByName('wall-' + (i - 1));
      object.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.name.includes('planks')) {
          child.material = newMaterial;
          console.log('Changing texture for ', child.name);
        }
      });
    }
  }

  changeTrimTexture(newTexture) {
    let self: AppComponent = this;
    this.scene.children.forEach(child => {
      child.children.forEach(el => {
        if (el instanceof THREE.Mesh && el.name.includes('trim')) {
          let textureName = newTexture.order_code;
          var texture = new THREE.TextureLoader().load(
            '../assets/textures/' + textureName + '.jpg'
          );
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;

          let newMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            reflectivity: 0.1
          });

          el.material = newMaterial;
        }
      });
    });
  }

  render() {
    let self: AppComponent = this;

    (function render() {
      requestAnimationFrame(render);
      self.renderer.render(self.sceneBg, self.camera);
      self.renderer.render(self.sceneRoofOptions, self.camera);

      self.renderer.context.colorMask(false, false, false, false); // R, G, B, A
      self.renderer.render(self.sceneRoofMask, self.camera);

      self.renderer.context.colorMask(true, true, true, true);
      self.renderer.render(self.sceneRoof, self.camera);
      self.renderer.context.colorMask(false, false, false, false); // R, G, B, A
      self.renderer.render(self.sceneWallMask, self.camera);

      self.renderer.context.colorMask(true, true, true, true);
      self.renderer.render(self.scene, self.camera);
      var vector = self.camera.getWorldDirection(new THREE.Vector3());
      self.cameraAngle = THREE.Math.radToDeg(Math.atan2(vector.x, vector.z));
      self.cameraAngle = Math.round(self.cameraAngle);

      if (
        (self.cameraAngle > 115 && self.cameraAngle < 180) ||
        (self.cameraAngle > -180 && self.cameraAngle < -135)
      ) {
        self.currentWall = 0;
      }
      if (self.cameraAngle < 105 && self.cameraAngle > 35) {
        self.currentWall = 1;
      }
      if (self.cameraAngle > -105 && self.cameraAngle < -45) {
        self.currentWall = 3;
      }
      if (
        (self.cameraAngle > -25 && self.cameraAngle <= 0) ||
        (self.cameraAngle >= 0 && self.cameraAngle < 55)
      ) {
        self.currentWall = 2;
      }
    })();
  }

  addObjectTransparency(object) {
    this.selectedElement.children.forEach(el => {
      if (el.type === 'Mesh') {
        el.material.transparent = true;
        el.material.opacity = 0.7;
      }
    });
  }

  removeObjectTransparency(object) {
    object.children.forEach(el => {
      if (el.type === 'Mesh') {
        el.material.transparent = false;
        el.material.opacity = 1;
      }
    });
  }

  removeSelectedElement() {
    console.log('deleting ', this.selectedElement);
    let parent = this.selectedElement.parent;
    parent.remove(this.selectedElement);
    this.selectedElement = null;
  }

  toggleProductStyleStates() {
    this.stylesDrawerState =
      this.stylesDrawerState === 'active' ? 'inactive' : 'active';
  }

  showSidings() {
    this.sidingsDrawerState = 'active';
  }
  closeSidingsDrawer() {
    this.sidingsDrawerState = 'inactive';
  }
  showTrim() {
    this.trimDrawerState = 'active';
  }
  closeTrimDrawer() {
    this.trimDrawerState = 'inactive';
  }

  showOptions(category) {
    this.selectedOptionsCategory = category;
    this._productService.getCategoryOptions(category.id).subscribe(res => {
      this.availableOptions = [];
      res.forEach(opt => {
        opt['image'] =
          '../assets/thumbnails/' +
          opt.opt_type +
          '/' +
          opt.order_code.toLowerCase() +
          '.png';
        this.availableOptions.push(opt);
      });
    });
    this.optionsDrawerState = 'active';
  }
  closeOptions() {
    this.optionsDrawerState = 'inactive';
  }
  loadTwoDormers() {
    let self: AppComponent = this;
    let targetObject = self.sceneRoof.getObjectByName('roof');
    let targetPos = targetObject.getWorldPosition();
    var targetSize = self.objectSize(targetObject);
    const roofSize = this.objectSize(targetObject).x;

    const mtlLoader = new MTLLoader();
    mtlLoader.setPath('../assets/models/roof/');

    mtlLoader.load('dormer_1.mtl', function(materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setPath('../assets/models/roof/');

      objLoader.setMaterials(materials);
      objLoader.load(
        'dormer.obj',
        function(object) {
          object.name = 'dormer';
          let objectSize = self.objectSize(object);

          object.position.x = targetPos.x - roofSize / 4;
          object.position.y = targetPos.y - targetSize.y / 2 + objectSize.y / 2;
          object.position.z = targetPos.z + targetSize.z / 2 - objectSize.z / 2;

          self.sceneRoofOptions.add(object);
        },
        self.onProgress,
        self.onError
      );

      objLoader.load(
        'dormer_mask.obj',
        function(object) {
          object.name = 'dormer_mask';
          let objectSize = self.objectSize(object);

          object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
              child.material = self.selectedMaterial;
            }
          });

          object.position.x = targetPos.x - roofSize / 4;
          object.position.y = targetPos.y - targetSize.y / 2 + objectSize.y / 2;
          object.position.z = targetPos.z + targetSize.z / 2 - objectSize.z / 2;

          self.sceneRoofMask.add(object);
        },
        self.onProgress,
        self.onError
      );
    });

    mtlLoader.load('dormer.mtl', function(materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setPath('../assets/models/roof/');

      objLoader.setMaterials(materials);
      objLoader.load(
        'dormer.obj',
        function(object) {
          object.name = 'dormer';
          let objectSize = self.objectSize(object);

          // calculate position
          object.position.x = targetPos.x + roofSize / 4;
          object.position.y = targetPos.y - targetSize.y / 2 + objectSize.y / 2;
          object.position.z = targetPos.z + targetSize.z / 2 - objectSize.z / 2;

          self.sceneRoofOptions.add(object);
        },
        self.onProgress,
        self.onError
      );

      objLoader.load(
        'dormer_mask.obj',
        function(object) {
          object.name = 'dormer_mask';
          let objectSize = self.objectSize(object);

          object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
              child.material = self.selectedMaterial;
            }
          });

          object.position.x = targetPos.x + roofSize / 4;
          object.position.y = targetPos.y - targetSize.y / 2 + objectSize.y / 2;
          object.position.z = targetPos.z + targetSize.z / 2 - objectSize.z / 2;

          self.sceneRoofMask.add(object);
        },
        self.onProgress,
        self.onError
      );
    });
  }

  loadDormerOption() {
    let self: AppComponent = this;

    let targetObject = self.sceneRoof.getObjectByName('roof');
    let targetPos = targetObject.getWorldPosition();
    var targetSize = self.objectSize(targetObject);

    var mtlLoader = new MTLLoader();
    mtlLoader.setPath('../assets/models/dormer/');
    mtlLoader.load('dormer_2.mtl', function(materials) {
      materials.preload();

      var objLoader = new THREE.OBJLoader();
      objLoader.setPath('../assets/models/dormer/');

      objLoader.setMaterials(materials);
      objLoader.load(
        'dormer_2.obj',
        function(object) {
          object.name = 'dormer';

          let objectSize = self.objectSize(object);
          object.position.x = targetPos.x;
          object.position.y = targetPos.y - targetSize.y / 2 + objectSize.y / 2;
          object.position.z = targetPos.z + targetSize.z / 2 - objectSize.z / 2;

          self.sceneRoofOptions.add(object);
        },
        function(xhr) {
          self.percentComplete = Math.round((xhr.loaded / xhr.total) * 100);
        },
        function(error) {
          console.log('An error happened');
        }
      );

      objLoader.load(
        'dormer_mask.obj',
        function(object) {
          object.name = 'dormer_mask';
          let objectSize = self.objectSize(object);

          object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
              child.material = self.selectedMaterial;
            }
          });

          object.position.x = targetPos.x;
          object.position.y = targetPos.y - targetSize.y / 2 + objectSize.y / 2;
          object.position.z = targetPos.z + targetSize.z / 2 - objectSize.z / 2;

          self.sceneRoofMask.add(object);
        },
        self.onProgress,
        self.onError
      );
    });
  }
  getCompoundBoundingBox(object3D) {
    var box = null;
    object3D.traverse(function(obj3D) {
      var geometry = obj3D.geometry;
      if (geometry === undefined) return;
      geometry.computeBoundingBox();
      if (box === null) {
        box = geometry.boundingBox;
      } else {
        box.union(geometry.boundingBox);
      }
    });
    return box;
  }

  loadWindowOption(side, order_code, position) {
    let self: AppComponent = this;

    let targetObject = self.scene.getObjectByName('wall-' + side);
    let targetPos = targetObject.getWorldPosition();
    let targetSize = self.objectSize(targetObject);

    let promise = new Promise(function(resolve, reject) {
      var mtlLoader = new MTLLoader();
      mtlLoader.setPath('../assets/models/window/');
      mtlLoader.load(order_code.toLowerCase() + '.mtl', function(materials) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setPath('../assets/models/window/');

        objLoader.setMaterials(materials);
        objLoader.load(
          order_code.toLowerCase() + '.obj',
          function(object) {
            object.name = 'window-' + position;

            let pos = self.calculateWindowPosition(
              side,
              object,
              position,
              targetObject
            );
            object.position.x = pos.x;
            object.position.y = pos.y;
            object.position.z = pos.z;
            var scaleHeight;
            if (
              self.selectedConfiguration.cdcCustomData.wallsHeightRatio !== 1
            ) {
              scaleHeight =
                1 / self.selectedConfiguration.cdcCustomData.wallsHeightRatio;
            } else {
              scaleHeight = 7.875 / self.selectedConfiguration.height;
            }
            object.scale.set(1, scaleHeight, 1);

            object.traverse(function(child) {
              if (child instanceof THREE.Mesh && child.name.includes('glass')) {
                child.material = self.glassMaterial;
              }
            });

            targetObject.add(object);
            resolve(object);
          },
          function(xhr) {
            self.percentComplete = Math.round((xhr.loaded / xhr.total) * 100);
          },
          function(error) {
            console.log('An error happened');
          }
        );
      });
    });
    return promise;
  }

  calculateWindowPosition(side, object, position, targetObj) {
    let targetPos = targetObj.getWorldPosition();
    let targetSize = this.objectSize(targetObj);
    let objectSize = this.objectSize(object);
    let objectPos = { x: 0, y: 0, z: 4.2 };

    switch (position) {
      case 'center':
        objectPos.x = 0;
        break;
      case 'left':
        objectPos.x = -(targetSize.x / 3);
        break;
      case 'right':
        objectPos.x = targetSize.x / 3;
        break;
      default:
        alert('This is an unusual position: ' + position);
        break;
    }
    return objectPos;
  }

  loadFlowerboxOption(targetObject, order_code) {
    let self: AppComponent = this;

    let targetPos = targetObject.getWorldPosition();
    let targetSize = self.objectSize(targetObject);

    var mtlLoader = new MTLLoader();
    mtlLoader.setPath('../assets/models/flowerbox/');
    mtlLoader.load(order_code.toLowerCase() + '.mtl', materials => {
      materials.preload();

      var objLoader = new THREE.OBJLoader();
      objLoader.setPath('../assets/models/flowerbox/');

      objLoader.setMaterials(materials);
      objLoader.load(
        order_code.toLowerCase() + '.obj',
        object => {
          object.name = 'flowerbox';
          object.position.z = 3.5;

          targetObject.add(object);
          console.log('Target object after loading flowerbox ', targetObject);
          self.render();
        },
        function(xhr) {
          self.percentComplete = Math.round((xhr.loaded / xhr.total) * 100);
        },
        function(error) {
          console.log('An error happened');
        }
      );
    });
  }

  loadRoofingOptions() {
    let self: AppComponent = this;

    this.selectedConfiguration.general.option.forEach(option => {
      if (option) {
        if (option.itemClass === 'cupola') {
          let roof = self.sceneRoof.getObjectByName('roof');
          let targetObject = self.sceneRoof.getObjectByName('roof');
          let roofPosition = targetObject.getWorldPosition();
          let roofSize = self.objectSize(roof);
          let order_code = option.ordercode;

          var mtlLoader = new MTLLoader();
          mtlLoader.setPath('../assets/models/roofing/');
          mtlLoader.load(order_code.toLowerCase() + '.mtl', materials => {
            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setPath('../assets/models/roofing/');

            objLoader.setMaterials(materials);
            objLoader.load(
              order_code.toLowerCase() + '.obj',
              object => {
                let objectSize = self.objectSize(object);
                object.name = option.itemClass;
                object.position.x = roofPosition.x;
                object.position.y =
                  roofPosition.y + roofSize.y / 2 + objectSize.y / 3;
                object.position.z = roofPosition.z;

                self.scene.add(object);
              },
              self.onProgress,
              self.onError
            );
          });
        }
      }
    });
  }

  loadShutterOption(target, order_code) {
    let self: AppComponent = this;

    let targetObject = self.getAllObjectsWithName('window', target);
    console.log('[Shutters] Target window', targetObject);
  }

  loadDoorOption(target, order_code, position) {
    let self: AppComponent = this;

    let targetObject = self.scene.getObjectByName(target);
    let targetPos = targetObject.getWorldPosition();
    let targetSize = self.objectSize(targetObject);

    let promise = new Promise(function(resolve, reject) {
      var mtlLoader = new MTLLoader();
      mtlLoader.setPath('../assets/models/door/');
      mtlLoader.load(order_code.toLowerCase() + '.mtl', function(materials) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setPath('../assets/models/door/');

        objLoader.setMaterials(materials);
        objLoader.load(
          order_code.toLowerCase() + '.obj',
          function(object) {
            object.name = 'door-' + position;
            let pos = self.calculateDoorPosition(
              object,
              position,
              targetObject
            );
            object.position.x = pos.x;
            object.position.y = pos.y;
            object.position.z = pos.z;

            var scaleHeight;
            if (
              self.selectedConfiguration.cdcCustomData.wallsHeightRatio !== 1
            ) {
              scaleHeight =
                1 / self.selectedConfiguration.cdcCustomData.wallsHeightRatio;
            } else {
              scaleHeight = 7.875 / self.selectedConfiguration.height;
            }
            object.scale.set(1, scaleHeight, 1);

            object.traverse(function(child) {
              if (child instanceof THREE.Mesh && child.name.includes('glass')) {
                child.material = self.glassMaterial;
              }
            });

            targetObject.add(object);
            resolve(object);
          },
          self.onProgress,
          self.onError
        );
      });
    });
    return promise;
  }

  calculateDoorPosition(object, position, targetObj) {
    let targetPos = targetObj.getWorldPosition();
    let targetSize = this.objectSize(targetObj);
    let objectSize = this.objectSize(object);
    let objectPos = {
      x: 0,
      y: -(targetSize.y / 2) + objectSize.y / 2,
      z: 2.5
    };
    switch (position) {
      case 'center':
        objectPos.x = 0;

        break;

      case 'left':
        objectPos.x = targetSize.x / 3;
        break;
      case 'right':
        objectPos.x = -targetSize.x / 3;
        break;

      default:
        objectPos = { x: 0, y: 0, z: 0 };
        alert('This is an unusual position: ' + position);
        break;
    }
    return objectPos;
  }

  objectSize(obj) {
    let size = { x: 0, y: 0, z: 0 };
    let xxx = new THREE.Box3().setFromObject(obj);

    size['x'] = xxx.max.x - xxx.min.x;
    size['y'] = xxx.max.y - xxx.min.y;
    size['z'] = xxx.max.z - xxx.min.z;

    return size;
  }

  objectPosition(obj) {
    let position = { x: 0, y: 0, z: 0 };
    let xxx = new THREE.Box3().setFromObject(obj);

    position['x'] = xxx.min.x;
    position['y'] = xxx.min.y;
    position['z'] = xxx.min.z;

    return position;
  }

  clearStage() {
    let self: AppComponent = this;
    let promise = new Promise(function(resolve, reject) {
      let children = self.scene.children.filter(
        element =>
          element.name !== '' &&
          element.name !== 'ground' &&
          element.name !== 'skybox'
      );
      children.forEach(ch => {
        self.scene.remove(ch);
      });

      let roofChildren = self.sceneRoof.children.filter(
        element =>
          element.type !== 'DirectionalLight' && element.type !== 'AmbientLight'
      );
      roofChildren.forEach(ch => {
        self.sceneRoof.remove(ch);
      });

      let roofOptionsChildren = self.sceneRoofOptions.children.filter(
        element =>
          element.type !== 'DirectionalLight' && element.type !== 'AmbientLight'
      );
      roofOptionsChildren.forEach(ch => {
        self.sceneRoofOptions.remove(ch);
      });

      while (self.sceneRoofMask.children.length > 0) {
        self.sceneRoofMask.remove(self.sceneRoofMask.children[0]);
      }

      while (self.sceneWallMask.children.length > 0) {
        self.sceneWallMask.remove(self.sceneWallMask.children[0]);
      }

      resolve('Success: ');
    });
    return promise;
  }

  changeCategory(newCategory) {
    this.selectedCategory = newCategory;
  }

  onProductStyleClicked(style): void {
    this.selectedStyle = style;
    if (!Array.isArray(style.overhang)) {
      this.selectedStyle.overhang = [style.overhang];
    }
    console.log('[App Component] Style selected', style);

    this._productService
      .getProductConfiguration(style.$.defaultConfig)
      .subscribe(
        res => {
          this.selectedConfiguration = res;
          if (!Array.isArray(res.general.option)) {
            this.selectedConfiguration.general.option = [res.general.option];
          }

          console.log('Selected product', this.selectedConfiguration);
          this.clearStage().then(() => {
            console.log('Stage cleared');
            this.loadNewBuilding();
          });
        },
        err => {
          console.log('Error loading configuration!' + err);
        }
      );
  }

  onBaseProductClicked(category): void {
    this.selectedCategory = category;
  }

  onProductSizeChanged() {
    console.log('this.building_size', this.building_size);
    var building = this.building_size.split('x');
    this.selectedConfiguration.width = Number(building[1]) * 12;
    this.selectedConfiguration.depth = Number(building[0]) * 12;
    this.clearStage();
    this.loadNewBuilding();
  }

  setViewport() {
    let container = document.getElementById('renderer_container');

    this.viewport['width'] = container.clientWidth;
    this.viewport['height'] = window.innerHeight * 0.7;
  }

  takeScreenshot() {
    var w = window.open('', '');
    w.document.title = 'Summerwood_design.png';
    var img = new Image();
    this.renderer.render(this.scene, this.camera);
    img.src = this.renderer.domElement.toDataURL();

    var a = document.createElement('a');
    a.href = this.renderer.domElement
      .toDataURL()
      .replace('image/png', 'image/octet-stream');
    a.download = 'Summerwood_design.png';
    a.click();
  }

  shareOnFacebook() {
    var img = new Image();
    this.renderer.render(this.scene, this.camera);
    img.src = this.renderer.domElement.toDataURL();

    let formData: FormData = new FormData();
    formData.append('upload_preset', 'ojfipqhx');
    formData.append('file', img.src);

    let headers = new Headers();
    headers.append('X-Requested-With', 'XMLHttpRequest');
    this.http
      .post(`https://api.cloudinary.com/v1_1/summerwood/upload`, formData, {
        headers
      })
      .subscribe(data => {
        let info = data.json();
        window.open(
          'http://www.facebook.com/sharer.php?u=' + info.url,
          'This is my message',
          'width=500, height=500, scrollbars=yes, resizable=no'
        );
      });
  }

  shareOnTwitter() {
    var text = 'Check out my new creation that I made on http://summerwood.com';
    var img = new Image();
    // Without 'preserveDrawingBuffer' set to true, we must render now
    this.renderer.render(this.scene, this.camera);
    img.src = this.renderer.domElement.toDataURL();

    let formData: FormData = new FormData();
    formData.append('upload_preset', 'ojfipqhx');
    formData.append('file', img.src);

    let headers = new Headers();
    headers.append('X-Requested-With', 'XMLHttpRequest');
    this.http
      .post(`https://api.cloudinary.com/v1_1/pervasive/upload`, formData, {
        headers
      })
      .subscribe(data => {
        let info = data.json();
        window.open(
          'http://twitter.com/share?url=' +
            encodeURIComponent(info.url) +
            '&text=' +
            encodeURIComponent(text),
          '',
          'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0'
        );
      });
  }

  onBackgroundUploadFinished(file) {
    console.log('Uploaded file', file.src);
    this.useCustomerBackground(file.src);
  }

  onBackgroundRemoved(file) {
    console.log(file);
  }

  onBackgroundUploadStateChanged(state: boolean) {
    console.log('NEW Uploaded file', state);
  }

  useCustomerBackground(file) {
    let skyGeometry = new THREE.CubeGeometry(1000, 1000, 1000);
    let box = this.scene.getObjectByName('skybox');
    this.scene.remove(box);
    let textures = [
      '../assets/threetextures/cube/' +
        this.currentBackground +
        '/' +
        'posx' +
        '.jpg',
      '../assets/threetextures/cube/' +
        this.currentBackground +
        '/' +
        'negx' +
        '.jpg',
      '../assets/threetextures/cube/' +
        this.currentBackground +
        '/' +
        'posy' +
        '.jpg',
      '../assets/threetextures/cube/' +
        this.currentBackground +
        '/' +
        'negy' +
        '.jpg',
      '../assets/threetextures/cube/' +
        this.currentBackground +
        '/' +
        'posz' +
        '.jpg',
      '../assets/threetextures/cube/' +
        this.currentBackground +
        '/' +
        'negz' +
        '.jpg'
    ];
    var materialArray = [];
    for (var i = 0; i < 6; i++)
      materialArray.push(
        new THREE.MeshBasicMaterial({
          map: THREE.ImageUtils.loadTexture(textures[i]),
          side: THREE.BackSide
        })
      );
    materialArray[5] = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture(file),
      side: THREE.BackSide
    });
    var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    skyBox.name = 'skybox';
    this.scene.add(skyBox);
  }

  useCustomerBackground2(file) {
    let skyGeometry = new THREE.CubeGeometry(1000, 1000, 1000);
    let box = this.scene.getObjectByName('skybox');
    this.scene.remove(box);

    var materialArray = [];
    for (var i = 0; i < 6; i++)
      materialArray.push(
        new THREE.MeshBasicMaterial({
          map: THREE.ImageUtils.loadTexture(file),
          side: THREE.BackSide
        })
      );
    var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    skyBox.name = 'skybox';
    this.scene.add(skyBox);

  }
}
