import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Restaurant, RestaurantService } from './restaurant.service';

@Component({
		template: `
		<p class="page-title-lv2">
			The reviewer service is {{serverStatus}}
		</p>
		<p>
			Your Location :
			<input #Location id="location" value="Rotterdam" type="text" (keyup)="setLocation(Location.value)" (change)="setLocation(Location.value)"/>
			<br>
			<button (click)="getListOfRestaurantsByLocation(Location.value)">Search</button>
			<br>
		</p>
    <ul class="items">
			<li class="restaurant" *ngFor="let restaurant of listOfRestaurants" [class.selected]="isSelected(restaurant)" (click)="onSelect(restaurant)">
	        <h3 class="restaurant__name">{{ restaurant.name }}</h3>
			    <div class="restaurant_details">
			        <p>
			            <span class="detail-icon">
			                <span class="sr-only">Location</span>
			                <i class="fa fa-location-arrow"></i>
			            </span>
			            <span class="detail-text">
			                {{restaurant.location.display_address[0]}}
			            </span>
			        </p>
			        <p>
			            <span class="detail-icon">
			                <span class="sr-only">Listed in</span>
			                <i class="fa fa-cutlery"></i>
			            </span>
			            <span class="detail-text">
			                {{restaurant.categories[0].title}}
			            </span>
			        </p>
			    </div>
			</li>
    </ul>

  `
})

// @Injectable means that dependencies can be implicitly added by including new objects
// in the constructor parameter list.
@Injectable()
export class RestaurantListComponent implements OnInit {
	serverStatus: string = "";
	listOfRestaurants: Observable<Restaurant[]>;
	private selectedId: string;
	location: string = "";

	constructor (private dataService: RestaurantService, private router: Router, private route: ActivatedRoute) {}

	// Called after the constructor
	ngOnInit() {

		this.dataService.fetchServerStatus().subscribe(
		results => {
			// This code is invoked if/when the observable is resolved successfully
			console.log('results : ')
			this.serverStatus = results
		},
		error => {
			// This code is executed if/when the observable throws an error.
			console.log("Failed to fetch server status. Reason: " + error.toString);
			this.serverStatus = 'DOWN!'
		});

		this.dataService.fetchListOfRestaurants().subscribe(
		results => {
			console.log('results : ' + JSON.stringify(results))
			this.listOfRestaurants = results
		},
		error => {
			console.log("Failed to fetch list of restaurants. Reason: " + error.toString);
		});

	}

	setLocation(location: string) {
		console.log('Setting location : ' + location)
		this.location = location
	}

	isSelected(restaurant: Restaurant) { return restaurant.id === this.selectedId; }

  onSelect(restaurant: Restaurant) {
    this.router.navigate(['/restaurants', restaurant.id]);
  }

	getListOfRestaurantsByLocation(location: string) {
		this.dataService.searchForRestaurantsByLocation(location).subscribe(
		results => {
			console.log('results : ' + JSON.stringify(results))
			this.listOfRestaurants = results
		},
		error => {
			console.log("Failed to fetch list of restaurants. Reason: " + error.toString);
		});
	}


}
