import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PublicModule } from './public/public.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { PrivateModule } from './private/private.module';
import { AdminModule } from './admin/admin.module';
import {AgmCoreModule} from '@agm/core'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    PublicModule,
    PrivateModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton:true,
      positionClass: "toast-message",
      timeOut: 1000,
      progressBar: true,
      preventDuplicates:true
    }),
    AdminModule,
    AgmCoreModule.forRoot({
      apiKey:""
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
