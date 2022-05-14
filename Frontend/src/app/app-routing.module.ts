import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: "", loadChildren:()=>import('./public/public.module').then(m=>m.PublicModule) },
  { path: "private", loadChildren: () => import('./private/private.module').then(m => m.PrivateModule) },
  {path:"admin",component:AdminComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
