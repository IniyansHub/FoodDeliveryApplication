import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { LocationsComponent } from './components/locations/locations.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './components/category/category.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { OrderComponent } from './components/order/order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PrivateComponent,
    LocationsComponent,
    CategoryComponent,
    RestaurantsComponent,
    DishesComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PrivateModule { }
