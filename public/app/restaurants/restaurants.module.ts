
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { BrowserModule } 	from '@angular/platform-browser';
import { HttpModule } 		from '@angular/http';
import { RouterModule } from '@angular/router';

import { RestaurantListComponent }    from './restaurant-list.component';
import { RestaurantDetailComponent }  from './restaurant-detail.component';

import { RestaurantService } from './restaurant.service';

import { RestaurantRoutingModule } from './restaurants-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RestaurantRoutingModule
  ],
  declarations: [
    RestaurantListComponent,
    RestaurantDetailComponent
  ],
  providers: [ RestaurantService ]
})
export class RestaurantsModule {}
