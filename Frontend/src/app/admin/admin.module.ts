import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MUsersComponent } from './components/mUsers/mUsers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MhotelsComponent } from './components/mhotels/mhotels.component';
import { MmenusComponent } from './components/mmenus/mmenus.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AdminComponent, MUsersComponent, MhotelsComponent, MmenusComponent],
  imports: [CommonModule, AdminRoutingModule,FormsModule, ReactiveFormsModule,SharedModule]
})
export class AdminModule {} 
