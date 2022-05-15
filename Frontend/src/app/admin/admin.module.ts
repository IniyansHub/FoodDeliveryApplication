import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MUsersComponent } from './components/mUsers/mUsers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MhotelsComponent } from './components/mhotels/mhotels.component';
import { MmenusComponent } from './components/mmenus/mmenus.component';

@NgModule({
  declarations: [AdminComponent, MUsersComponent, MhotelsComponent, MmenusComponent],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
})
export class AdminModule {}
