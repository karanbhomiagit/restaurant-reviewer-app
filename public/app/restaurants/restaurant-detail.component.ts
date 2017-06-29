import { Component } from '@angular/core';
import { OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Restaurant, RestaurantService } from './restaurant.service';

@Component({
  template: `
  <p>
    <button (click)="gotoRestaurants()">Back</button>
    <br>
  </p>

  <ul *ngIf="restaurantDetails">
  <li class="restaurant">
  <h3 class="restaurant__name">{{restaurantDetails.name}}</h3>
  <div class="restaurant_details">
      <p>
          <span class="detail-text">
              Address : {{restaurantDetails.location.display_address.join(', ')}}
          </span>
      </p>
      <p>
          <span class="detail-text">
              Call : {{restaurantDetails.display_phone}}
          </span>
      </p>
      <p *ngIf="restaurantDetails.price">
          <span class="detail-text">
              Expensive : {{restaurantDetails.price}}
          </span>
      </p>
  </div>
  </li>
  </ul>


    <section class="reviews" *ngIf="reviews">
      <div class="wrapper">
          <h3 class="page-title-lv2 reviews-header">Reviews</h3>
      </div>

          <ul *ngIf="reviews">
            <li *ngFor="let review of reviews" class="restaurant">
              <div class="restaurant_details">
                <p>
                    <span class="detail-text">
                        {{review._userName}}
                    </span>
                </p>
                <p>
                    <span class="detail-text">
                        {{review.rating}}/5 stars
                    </span>
                </p>
                <p>
                    <span class="detail-text">
                        {{review.review}}
                    </span>
                </p>
              </div>
            </li>
          </ul>

  </section>

  <div class="wrapper">
      <h3 class="page-title-lv2 reviews-header">Add a review</h3>
  </div>
  <p> Your Name
    <input #Name id="name" value="" type="text" (keyup)="setReviewerName(Name.value)" (change)="setReviewerName(Name.value)"/>
    <br> Email ID
    <input #Email id="email" value="" type="text" (keyup)="setReviewerEmail(Email.value)" (change)="setReviewerEmail(Email.value)"/>
    <br> Stars out of 5
    <input #Rating id="rating" value="" type="text" (keyup)="setRating(Rating.value)" (change)="setRating(Rating.value)"/>
    <br> Please type your review here
    <input #Review id="review" value="" type="text" (keyup)="setReview(Review.value)" (change)="setReview(Review.value)"/>
    <br>
  </p>
  <p>
    <br>
    <button (click)="submitReview()">Submit</button>
  </p>


  <p>
    <br>
    <button (click)="gotoRestaurants()">Back</button>
  </p>
  `
})

// @Injectable means that dependencies can be implicitly added by including new objects
// in the constructor parameter list.
@Injectable()
export class RestaurantDetailComponent implements OnInit {
  reviews: {review: string, rating: string, _userName: string}[];
  restaurantDetails: Restaurant;
  reviewerEmail: string;
  reviewerName: string;
  rating: string;
  review: string;

	constructor (private route: ActivatedRoute, private dataService: RestaurantService, private router: Router) {};

	// Called after the constructor
	ngOnInit() {

  this.route.params
    .switchMap((params: Params) => this.dataService.getRestaurantById(params['id']))
    .subscribe((restaurantDetails : Restaurant) => this.restaurantDetails = restaurantDetails);

  this.route.params
    .switchMap((params: Params) => this.dataService.getReviewsForRestaurant(params['id']))
    .subscribe((reviews : [{review: string, rating: string, _userName: string}]) => this.reviews = reviews);

  }

  setReviewerName(name: string) {
		console.log('Setting name : ' + name)
		this.reviewerName = name
	}

  setReviewerEmail(email: string) {
		console.log('Setting email : ' + email)
		this.reviewerEmail = email
	}

  setRating(rating: string) {
		console.log('Setting rating : ' + rating)
		this.rating = rating
	}

  setReview(review: string) {
		console.log('Setting review : ' + review)
		this.review = review
	}

  submitReview() {
    this.dataService.postReviewsForRestaurant(this.restaurantDetails.id, this.reviewerName, this.reviewerEmail, this.rating, this.review).subscribe(
		results => {
			console.log('results : ' + JSON.stringify(results))
		},
		error => {
			console.log("Failed to post review for restaurant. Reason: " + error.toString);
		});
    this.router.navigate(['/restaurants', {}]);
  }

  gotoRestaurants() {
    this.router.navigate(['/restaurants', {}]);
  }
}
