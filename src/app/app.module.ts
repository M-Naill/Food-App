import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GlobalInterceptor } from './core/interceptors/global.interceptor';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // for making requests 
    BrowserAnimationsModule,  // for the toastr
    ToastrModule.forRoot(),  // for the toastr
    NgxDropzoneModule, // for uploading image
    NgxSpinnerModule,
    MatIconModule
    
    
  ],
  // here we provide the interceptor to be glocal on the application
  providers: [{
    provide:HTTP_INTERCEPTORS,
    //here we add the interceptor we have created
    useClass:GlobalInterceptor,
    // this prperty for multible interceptor
    multi:true,
  },

  {
    provide:HTTP_INTERCEPTORS,
    //here we add the interceptor we have created
    useClass:LoaderInterceptor,
    // this prperty for multible interceptor
    multi:true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
