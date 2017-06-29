import { Injectable } from '@angular/core';
import { Http } 	from '@angular/http';
import { Observable } 				from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class Restaurant {
  constructor(public id: string, public name: string, public categories: {alias: string, title: string}[], public location : {display_address: string[]}, public display_phone: string, public distance: string) { }
}

@Injectable()
export class RestaurantService {

	private baseURL: string = "http://localhost:8081/api/";	// The URL for the service

	constructor (private http: Http) {
	}

	fetchServerStatus() : Observable<string> {
		console.log('Inside fetchServerIP');
		return this.http.get(this.baseURL + "status")
		.map(response => response.json().message)
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	};

	fetchListOfRestaurants() : Observable<any> {
		console.log('Inside fetchListOfRestaurants');
    return this.http.get(this.baseURL + "restaurants")
    .map(response => response.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	};

  searchForRestaurantsByLocation(location: string) : Observable<any> {
		console.log('Inside searchForRestaurantsByLocation');
    //private body : { location: string } = { location: location };
    return this.http.post(this.baseURL + "restaurants/search", { location: location })
    .map(response => response.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	};

	getReviewsForRestaurant(id : string) : Observable<any> {
		console.log('Inside getReviewsForRestaurant, id : ' + id);
		return this.http.get(this.baseURL + "restaurants/" + id + "/reviews")
		.map(response => response.json())
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	};

  getRestaurantById(id: string) : Observable<any>{
    console.log('Inside getRestaurantById, id : ' + id);
    return this.http.get(this.baseURL + "restaurants/" + id)
    .map(response => response.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
  };

  postReviewsForRestaurant(id: string, name: string, email: string, rating: string, review: string) : Observable<any>{
    console.log('Inside postReviewsForRestaurant, id : ' + id);
    console.log('Inside postReviewsForRestaurant, name : ' + name);
    console.log('Inside postReviewsForRestaurant, email : ' + email);
    return this.http.post(this.baseURL + "restaurants/" + id + "/reviews", { "username": name, "email": email, "rating": rating, "review": review})
    .map(response => response.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
  };
}
