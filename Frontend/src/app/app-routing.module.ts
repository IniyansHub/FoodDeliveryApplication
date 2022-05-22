import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", loadChildren:()=>import('./public/public.module').then(m=>m.PublicModule) },
  { path: "private", loadChildren: () => import('./private/private.module').then(m => m.PrivateModule) },
  {path:"admin",loadChildren:()=> import('./admin/admin.module').then(m=>m.AdminModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
