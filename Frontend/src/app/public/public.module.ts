import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationsComponent } from './components/locations/locations.component';


@NgModule({
  declarations: [
  
    PublicComponent,
        LoginComponent,
        NavbarComponent,
        SignupComponent,
        LocationsComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    PublicComponent
  ]
})
export class PublicModule { }
