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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var Restaurant = (function () {
    function Restaurant(id, name, categories, location, display_phone, distance) {
        this.id = id;
        this.name = name;
        this.categories = categories;
        this.location = location;
        this.display_phone = display_phone;
        this.distance = distance;
    }
    return Restaurant;
}());
exports.Restaurant = Restaurant;
var RestaurantService = (function () {
    function RestaurantService(http) {
        this.http = http;
        this.baseURL = "http://localhost:8081/api/"; // The URL for the service
    }
    RestaurantService.prototype.fetchServerStatus = function () {
        console.log('Inside fetchServerIP');
        return this.http.get(this.baseURL + "status")
            .map(function (response) { return response.json().message; })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ;
    RestaurantService.prototype.fetchListOfRestaurants = function () {
        console.log('Inside fetchListOfRestaurants');
        return this.http.get(this.baseURL + "restaurants")
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ;
    RestaurantService.prototype.searchForRestaurantsByLocation = function (location) {
        console.log('Inside searchForRestaurantsByLocation');
        //private body : { location: string } = { location: location };
        return this.http.post(this.baseURL + "restaurants/search", { location: location })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ;
    RestaurantService.prototype.getReviewsForRestaurant = function (id) {
        console.log('Inside getReviewsForRestaurant, id : ' + id);
        return this.http.get(this.baseURL + "restaurants/" + id + "/reviews")
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ;
    RestaurantService.prototype.getRestaurantById = function (id) {
        console.log('Inside getRestaurantById, id : ' + id);
        return this.http.get(this.baseURL + "restaurants/" + id)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ;
    RestaurantService.prototype.postReviewsForRestaurant = function (id, name, email, rating, review) {
        console.log('Inside postReviewsForRestaurant, id : ' + id);
        console.log('Inside postReviewsForRestaurant, name : ' + name);
        console.log('Inside postReviewsForRestaurant, email : ' + email);
        return this.http.post(this.baseURL + "restaurants/" + id + "/reviews", { "username": name, "email": email, "rating": rating, "review": review })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ;
    RestaurantService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RestaurantService);
    return RestaurantService;
}());
exports.RestaurantService = RestaurantService;
//# sourceMappingURL=restaurant.service.js.map