import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private/private.component';
import { PublicComponent } from './public/public.component';

const routes: Routes = [
  // { path: "", loadChildren:()=>import('./public/public.module').then(m=>m.PublicModule) },
  // { path:"private",loadChildren:()=>import('./private/private.module').then(m=>m.PrivateModule)}
  { path: "", component: PublicComponent },
  {path:"private",component:PrivateComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
