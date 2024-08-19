import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-respass',
  templateUrl: './respass.component.html',
  styleUrls: ['./respass.component.scss']
})
export class RespassComponent {
  isHide:boolean=true; // for the eye showes in password input
  errorMessage:string = '';

  resetPassForm=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')
    ]),
    confirmPassword:new FormControl(null,Validators.required),
    seed:new FormControl(null,Validators.required),})

  constructor(private _AuthService:AuthService ,
    private toastr:ToastrService, // instance for the toaster 
    private router:Router
){ 
}
// onLogin function will take instance from Authservice on login function to send the request
// the function takes data from type formgroup that has been sent from firing the submit 
// then we subscribe on the observable returned from the authservice function 
// in the next we specfiy what will happen after we get the result 
// in the error we specfiy what will happen when facing error 
// in the complete we specfiy the action after we fi ish recieving the request 
onResetPass(data:FormGroup){
console.log(data);

this._AuthService.onResetPassword(data.value).subscribe({
next: (res)=>{
console.log(res);
},
error:(err)=>{
this.toastr.error(err.error.message)
},
complete:()=>{
// here we will add instance from the toaster success
this.toastr.success('Password Reset succefully', 'Success');
this.router.navigate(['/auth/login']) // go to dashboard
},
});
  
}}