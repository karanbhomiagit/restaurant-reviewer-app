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
var core_2 = require('@angular/core');
var router_1 = require('@angular/router');
require('rxjs/add/operator/switchMap');
var restaurant_service_1 = require('./restaurant.service');
var RestaurantDetailComponent = (function () {
    function RestaurantDetailComponent(route, dataService, router) {
        this.route = route;
        this.dataService = dataService;
        this.router = router;
    }
    ;
    // Called after the constructor
    RestaurantDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.dataService.getRestaurantById(params['id']); })
            .subscribe(function (restaurantDetails) { return _this.restaurantDetails = restaurantDetails; });
        this.route.params
            .switchMap(function (params) { return _this.dataService.getReviewsForRestaurant(params['id']); })
            .subscribe(function (reviews) { return _this.reviews = reviews; });
    };
    RestaurantDetailComponent.prototype.setReviewerName = function (name) {
        console.log('Setting name : ' + name);
        this.reviewerName = name;
    };
    RestaurantDetailComponent.prototype.setReviewerEmail = function (email) {
        console.log('Setting email : ' + email);
        this.reviewerEmail = email;
    };
    RestaurantDetailComponent.prototype.setRating = function (rating) {
        console.log('Setting rating : ' + rating);
        this.rating = rating;
    };
    RestaurantDetailComponent.prototype.setReview = function (review) {
        console.log('Setting review : ' + review);
        this.review = review;
    };
    RestaurantDetailComponent.prototype.submitReview = function () {
        this.dataService.postReviewsForRestaurant(this.restaurantDetails.id, this.reviewerName, this.reviewerEmail, this.rating, this.review).subscribe(function (results) {
            console.log('results : ' + JSON.stringify(results));
        }, function (error) {
            console.log("Failed to post review for restaurant. Reason: " + error.toString);
        });
        this.router.navigate(['/restaurants', {}]);
    };
    RestaurantDetailComponent.prototype.gotoRestaurants = function () {
        this.router.navigate(['/restaurants', {}]);
    };
    RestaurantDetailComponent = __decorate([
        core_1.Component({
            template: "\n  <p>\n    <button (click)=\"gotoRestaurants()\">Back</button>\n    <br>\n  </p>\n\n  <ul *ngIf=\"restaurantDetails\">\n  <li class=\"restaurant\">\n  <h3 class=\"restaurant__name\">{{restaurantDetails.name}}</h3>\n  <div class=\"restaurant_details\">\n      <p>\n          <span class=\"detail-text\">\n              Address : {{restaurantDetails.location.display_address.join(', ')}}\n          </span>\n      </p>\n      <p>\n          <span class=\"detail-text\">\n              Call : {{restaurantDetails.display_phone}}\n          </span>\n      </p>\n      <p *ngIf=\"restaurantDetails.price\">\n          <span class=\"detail-text\">\n              Expensive : {{restaurantDetails.price}}\n          </span>\n      </p>\n  </div>\n  </li>\n  </ul>\n\n\n    <section class=\"reviews\" *ngIf=\"reviews\">\n      <div class=\"wrapper\">\n          <h3 class=\"page-title-lv2 reviews-header\">Reviews</h3>\n      </div>\n\n          <ul *ngIf=\"reviews\">\n            <li *ngFor=\"let review of reviews\" class=\"restaurant\">\n              <div class=\"restaurant_details\">\n                <p>\n                    <span class=\"detail-text\">\n                        {{review._userName}}\n                    </span>\n                </p>\n                <p>\n                    <span class=\"detail-text\">\n                        {{review.rating}}/5 stars\n                    </span>\n                </p>\n                <p>\n                    <span class=\"detail-text\">\n                        {{review.review}}\n                    </span>\n                </p>\n              </div>\n            </li>\n          </ul>\n\n  </section>\n\n  <div class=\"wrapper\">\n      <h3 class=\"page-title-lv2 reviews-header\">Add a review</h3>\n  </div>\n  <p> Your Name\n    <input #Name id=\"name\" value=\"\" type=\"text\" (keyup)=\"setReviewerName(Name.value)\" (change)=\"setReviewerName(Name.value)\"/>\n    <br> Email ID\n    <input #Email id=\"email\" value=\"\" type=\"text\" (keyup)=\"setReviewerEmail(Email.value)\" (change)=\"setReviewerEmail(Email.value)\"/>\n    <br> Stars out of 5\n    <input #Rating id=\"rating\" value=\"\" type=\"text\" (keyup)=\"setRating(Rating.value)\" (change)=\"setRating(Rating.value)\"/>\n    <br> Please type your review here\n    <input #Review id=\"review\" value=\"\" type=\"text\" (keyup)=\"setReview(Review.value)\" (change)=\"setReview(Review.value)\"/>\n    <br>\n  </p>\n  <p>\n    <br>\n    <button (click)=\"submitReview()\">Submit</button>\n  </p>\n\n\n  <p>\n    <br>\n    <button (click)=\"gotoRestaurants()\">Back</button>\n  </p>\n  "
        }),
        core_2.Injectable(), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, restaurant_service_1.RestaurantService, router_1.Router])
    ], RestaurantDetailComponent);
    return RestaurantDetailComponent;
}());
exports.RestaurantDetailComponent = RestaurantDetailComponent;
//# sourceMappingURL=restaurant-detail.component.js.map