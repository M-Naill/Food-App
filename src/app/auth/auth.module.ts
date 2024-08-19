import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { VerfiyComponent } from './components/verfiy/verfiy.component';
import { RespassComponent } from './components/respass/respass.component';
import { ForgetpassComponent } from './components/forgetpass/forgetpass.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    VerfiyComponent,
    RespassComponent,
    ForgetpassComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule, // import shared module to let all the childerns on decleration  see it
     // for uploading image 

  ]
})
export class AuthModule { }
