import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';


@NgModule({
  declarations: [
    PrivateComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule
  ],
  exports: [
    PrivateComponent
  ]
})
export class PrivateModule { }
