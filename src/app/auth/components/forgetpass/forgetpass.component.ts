import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.scss']
})
export class ForgetpassComponent {

  forgetPassForm=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
  })

  constructor(private _AuthService:AuthService ,
    private toastr:ToastrService, // instance for the toaster 
    private router:Router
){ 
}

onForgetPass(data:FormGroup){
console.log(data);

this._AuthService.onCheckEmail(data.value).subscribe({
next: (res)=>{
console.log(res);
},
error:(err)=>{
this.toastr.error(err.error.message)
},
complete:()=>{
// here we will add instance from the toaster success
this.toastr.success('Email verified', 'Code has been sent to your email');
this.router.navigate(['/auth/reset-password']) // go to dashboard
},
});
}
}

