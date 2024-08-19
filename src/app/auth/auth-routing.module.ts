import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetpassComponent } from './components/forgetpass/forgetpass.component';
import { RespassComponent } from './components/respass/respass.component';


const routes: Routes = [
  { path: '', redirectTo:'login',pathMatch:'full' }, // once auth is in the url go to login
  {path:'login',component:LoginComponent},
  { path:'register',component:RegisterComponent},
  { path:'foreget-password',component:ForgetpassComponent},
  { path:'reset-password',component:RespassComponent} // for new component must do the routing

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
