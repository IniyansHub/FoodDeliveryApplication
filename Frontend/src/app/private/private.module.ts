import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { LocationsComponent } from './components/locations/locations.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './components/category/category.component';



@NgModule({
  declarations: [
    PrivateComponent,
    LocationsComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule
  ]
})
export class PrivateModule { }
