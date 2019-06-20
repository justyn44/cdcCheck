"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
// tslint:disable
var UtilitiesService = /** @class */ (function () {
    function UtilitiesService() {
        this.UtilitiesService = (function () {
            function UtilitiesService() { }
            UtilitiesService.prototype.getStandardChildSizes = function (scale) {
                var reverseScale = scale;
                console.log('[Utilities Service] Scale ', scale);
                for (var p in reverseScale) {
                    if (reverseScale.hasOwnProperty(p)) {
                        reverseScale[p] = 1 / reverseScale[p];
                    }
                }
                console.log('[Utilities Service] ReverseScale ', reverseScale);
                return reverseScale;
            };
            UtilitiesService = tslib_1.__decorate([
                Object('Injectable')({
                    providedIn: 'root'
                }),
                tslib_1.__metadata('design:paramtypes', [])
            ], UtilitiesService);
            return UtilitiesService;
        })();
    }
    return UtilitiesService;
}());
exports.UtilitiesService = UtilitiesService;
