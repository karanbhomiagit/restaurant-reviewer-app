import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantListComponent }    from './restaurant-list.component';
import { RestaurantDetailComponent }  from './restaurant-detail.component';

const restaurantsRoutes: Routes = [
  { path: 'restaurants',  component: RestaurantListComponent },
  { path: 'restaurants/:id', component: RestaurantDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(restaurantsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RestaurantRoutingModule { }
