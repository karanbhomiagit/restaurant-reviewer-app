"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var restaurant_list_component_1 = require('./restaurant-list.component');
var restaurant_detail_component_1 = require('./restaurant-detail.component');
var restaurantsRoutes = [
    { path: 'restaurants', component: restaurant_list_component_1.RestaurantListComponent },
    { path: 'restaurants/:id', component: restaurant_detail_component_1.RestaurantDetailComponent }
];
var RestaurantRoutingModule = (function () {
    function RestaurantRoutingModule() {
    }
    RestaurantRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(restaurantsRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], RestaurantRoutingModule);
    return RestaurantRoutingModule;
}());
exports.RestaurantRoutingModule = RestaurantRoutingModule;
//# sourceMappingURL=restaurants-routing.module.js.map