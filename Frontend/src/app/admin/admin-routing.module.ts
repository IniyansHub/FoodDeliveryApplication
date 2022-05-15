import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MhotelsComponent } from './components/mhotels/mhotels.component';
import { MmenusComponent } from './components/mmenus/mmenus.component';
import { MUsersComponent } from './components/mUsers/mUsers.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'users', component: MUsersComponent },
      { path: 'hotels', component: MhotelsComponent },
      { path: 'menus', component: MmenusComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
