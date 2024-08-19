import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../interfaces/ilogin';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode"; // import the jwt library here to decode the token 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Add instance from httpclient on the constructor to use it 
  constructor(private _HttpClient:HttpClient, private Router:Router) { 

    // here we check if the token is in the storage and we use get profile here to keep the same user login
    // we use it here in the constructor to initiate it every time we use the auth service 
    if(localStorage.getItem('userToken')!== null ){
      this.getProfile();
    }

  }

  role:string | null = '';


  // this function for decoding the token and know the user deatiles
  // written here to be able to use it anywhere in the app
  getProfile(){
    //get the token from the local storage
    let encodeToken:any=localStorage.getItem('userToken');
    // store the decoded token after using the jwtdecode function
    let decoded : any = jwtDecode(encodeToken); //token is decoded
    console.log(decoded);
    //store the profile detalis needed through the session in the local storage
    localStorage.setItem('userEmail', decoded.userEmail)
    localStorage.setItem('userName', decoded.userName)
    // here we save the role to sue it in guards 
    localStorage.setItem('role', decoded.userGroup)
    // we use the getrole here to keep the same token 
    this.getRole();
  }

  // this function will check the user token in the local storage and the role to check if the token is still available in the local storage
  getRole(){
    if(localStorage.getItem('userToken')!==null && localStorage.getItem('role')!==null)
    {
      this.role=localStorage.getItem('role');
    }
  }

// on login function 
//function takes data parameter which consists of (email and password from the form on login page)
//return observabel to subscribe on it in the logincomponent.ts
// post in the http request takes the url ( end point ) and the data for the request body 
// post return the response in observable so to access this we need to subscribe on it in the login.ts where we will use instance of that function
  onLogin(data:ILogin):Observable<any>{
    return this._HttpClient.post(
      'Users/Login',data
    );
  }

  // onregister do the same as login but in register
  // takes data from type FormData as api requested and made by appending on register.ts
  onRegister(data:FormData):Observable<any>{
    return this._HttpClient.post(
      'Users/Register',data
    );
  }
// here we use verify end point
  onVerifyAccount(data:any):Observable<any>{
    return this._HttpClient.put(
      'Users/verify',data
    );
  }

  // here for forget password
  onCheckEmail(data:any):Observable<any>{
    return this._HttpClient.post(
      'Users/Reset/Request',data
    );
  }

  onResetPassword(data:any):Observable<any>{
    return this._HttpClient.post(
      'Users/Reset',data
    );
  }

  logout(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('role');
    this.Router.navigate(['/auth/login']);
  };
}
