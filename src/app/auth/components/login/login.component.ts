import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr'; // import for toaster 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isHide:boolean=true; // for the eye showes in password input
  errorMessage:string = '';
  //make the form and link it with the html with formgroup
  loginForm=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')
    ]),
  })

  constructor(private _AuthService:AuthService ,
              private toastr:ToastrService, // instance for the toaster 
              private router:Router,
  ){ 
  }
  // onLogin function will take instance from Authservice on login function to send the request
  // the function takes data from type formgroup that has been sent from firing the submit 
  // then we subscribe on the observable returned from the authservice function 
  // in the next we specfiy what will happen after we get the result 
  // in the error we specfiy what will happen when facing error 
  // in the complete we specfiy the action after we fi ish recieving the request 
  onLogin(data:FormGroup){
    console.log(data);

    this._AuthService.onLogin(data.value).subscribe({
      next: (res)=>{
        console.log(res);
        // here we will save the token as it's in the response we are recieving 
        localStorage.setItem('userToken',res.token)
        // then we will use the function from authservice to store the user details 
        this._AuthService.getProfile();
      },
      error:(err)=>{
        this.toastr.error(err.error.message)
      },
      complete:()=>{
        // here we will add instance from the toaster success
        this.toastr.success('Success', 'Login succesfully');
        this.router.navigate(['/dashboard']) // go to dashboard
      },
    });
  }
}
