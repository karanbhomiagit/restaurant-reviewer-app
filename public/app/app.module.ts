import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule }      from '@angular/http';

import { AppComponent }            from './app.component';
import { AppRoutingModule }        from './app-routing.module';

import { RestaurantsModule }            from './restaurants/restaurants.module';

@NgModule({
  imports: [
    RestaurantsModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
