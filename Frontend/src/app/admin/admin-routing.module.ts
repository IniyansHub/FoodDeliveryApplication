import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MUsersComponent } from './components/m-users/m-users.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path:'users',component:MUsersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
