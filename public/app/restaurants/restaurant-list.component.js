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
require('rxjs/add/operator/switchMap');
var restaurant_service_1 = require('./restaurant.service');
var RestaurantListComponent = (function () {
    function RestaurantListComponent(dataService, router, route) {
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.serverStatus = "";
        this.location = "";
    }
    // Called after the constructor
    RestaurantListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.fetchServerStatus().subscribe(function (results) {
            // This code is invoked if/when the observable is resolved successfully
            console.log('results : ');
            _this.serverStatus = results;
        }, function (error) {
            // This code is executed if/when the observable throws an error.
            console.log("Failed to fetch server status. Reason: " + error.toString);
            _this.serverStatus = 'DOWN!';
        });
        this.dataService.fetchListOfRestaurants().subscribe(function (results) {
            console.log('results : ' + JSON.stringify(results));
            _this.listOfRestaurants = results;
        }, function (error) {
            console.log("Failed to fetch list of restaurants. Reason: " + error.toString);
        });
    };
    RestaurantListComponent.prototype.setLocation = function (location) {
        console.log('Setting location : ' + location);
        this.location = location;
    };
    RestaurantListComponent.prototype.isSelected = function (restaurant) { return restaurant.id === this.selectedId; };
    RestaurantListComponent.prototype.onSelect = function (restaurant) {
        this.router.navigate(['/restaurants', restaurant.id]);
    };
    RestaurantListComponent.prototype.getListOfRestaurantsByLocation = function (location) {
        var _this = this;
        this.dataService.searchForRestaurantsByLocation(location).subscribe(function (results) {
            console.log('results : ' + JSON.stringify(results));
            _this.listOfRestaurants = results;
        }, function (error) {
            console.log("Failed to fetch list of restaurants. Reason: " + error.toString);
        });
    };
    RestaurantListComponent = __decorate([
        core_1.Component({
            template: "\n\t\t<p class=\"page-title-lv2\">\n\t\t\tThe reviewer service is {{serverStatus}}\n\t\t</p>\n\t\t<p>\n\t\t\tYour Location :\n\t\t\t<input #Location id=\"location\" value=\"Rotterdam\" type=\"text\" (keyup)=\"setLocation(Location.value)\" (change)=\"setLocation(Location.value)\"/>\n\t\t\t<br>\n\t\t\t<button (click)=\"getListOfRestaurantsByLocation(Location.value)\">Search</button>\n\t\t\t<br>\n\t\t</p>\n    <ul class=\"items\">\n\t\t\t<li class=\"restaurant\" *ngFor=\"let restaurant of listOfRestaurants\" [class.selected]=\"isSelected(restaurant)\" (click)=\"onSelect(restaurant)\">\n\t        <h3 class=\"restaurant__name\">{{ restaurant.name }}</h3>\n\t\t\t    <div class=\"restaurant_details\">\n\t\t\t        <p>\n\t\t\t            <span class=\"detail-icon\">\n\t\t\t                <span class=\"sr-only\">Location</span>\n\t\t\t                <i class=\"fa fa-location-arrow\"></i>\n\t\t\t            </span>\n\t\t\t            <span class=\"detail-text\">\n\t\t\t                {{restaurant.location.display_address[0]}}\n\t\t\t            </span>\n\t\t\t        </p>\n\t\t\t        <p>\n\t\t\t            <span class=\"detail-icon\">\n\t\t\t                <span class=\"sr-only\">Listed in</span>\n\t\t\t                <i class=\"fa fa-cutlery\"></i>\n\t\t\t            </span>\n\t\t\t            <span class=\"detail-text\">\n\t\t\t                {{restaurant.categories[0].title}}\n\t\t\t            </span>\n\t\t\t        </p>\n\t\t\t    </div>\n\t\t\t</li>\n    </ul>\n\n  "
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [restaurant_service_1.RestaurantService, router_1.Router, router_1.ActivatedRoute])
    ], RestaurantListComponent);
    return RestaurantListComponent;
}());
exports.RestaurantListComponent = RestaurantListComponent;
//# sourceMappingURL=restaurant-list.component.js.map