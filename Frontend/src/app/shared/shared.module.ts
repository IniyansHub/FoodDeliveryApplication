import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../public/components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TitlefilterPipe } from './pipes/titlefilter.pipe';
import { UserFilterPipe } from './pipes/user-filter.pipe';
import { MenufilterPipe } from './pipes/menufilter.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    TitlefilterPipe,
    UserFilterPipe,
    MenufilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    TitlefilterPipe,
    UserFilterPipe,
    MenufilterPipe
  ]
})
export class SharedModule { }
