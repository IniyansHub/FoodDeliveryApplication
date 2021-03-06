import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { CategoryComponent } from './components/category/category.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { LocationsComponent } from './components/locations/locations.component';
import { OrderComponent } from './components/order/order.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { PrivateComponent } from './private.component';

const routes: Routes = [{
  path: 'private', component: PrivateComponent,
  children: [
    { path: 'location', component: LocationsComponent, canActivate: [AuthGuard] },
    { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
    { path: 'restaurants', component: RestaurantsComponent, canActivate: [AuthGuard] },
    { path: 'menus', component: DishesComponent, canActivate: [AuthGuard] },
    { path: 'location', component: LocationsComponent, canActivate: [AuthGuard] },
    { path:'order',component:OrderComponent, canActivate:[AuthGuard] }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
