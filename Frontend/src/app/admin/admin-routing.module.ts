import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { AuthGuard } from '../core/guards/auth.guard';
import { AdminComponent } from './admin.component';
import { MhotelsComponent } from './components/mhotels/mhotels.component';
import { MmenusComponent } from './components/mmenus/mmenus.component';
import { MUsersComponent } from './components/mUsers/mUsers.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,canActivate:[AuthGuard,AdminGuard],
    children: [
      { path: 'users', component: MUsersComponent,canActivate:[AuthGuard,AdminGuard]},
      { path: 'hotels', component: MhotelsComponent,canActivate:[AuthGuard,AdminGuard] },
      { path: 'menus', component: MmenusComponent,canActivate:[AuthGuard,AdminGuard] }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
