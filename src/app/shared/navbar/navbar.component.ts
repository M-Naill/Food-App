import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private _AuthService:AuthService){

  }
userName=localStorage.getItem('userName');
userRole=localStorage.getItem('role');

logout(){
  this._AuthService.logout()
}

}
