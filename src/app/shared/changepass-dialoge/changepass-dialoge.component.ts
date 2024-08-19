import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ChangePassService } from '../service/change-pass.service';

@Component({
  selector: 'app-changepass-dialoge',
  templateUrl: './changepass-dialoge.component.html',
  styleUrls: ['./changepass-dialoge.component.scss']
})
export class ChangepassDialogeComponent {
  showPassword = false;

 

  constructor(
    public dialogRef: MatDialogRef<ChangepassDialogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ChangePassService:ChangePassService ,
    private toastr:ToastrService, // instance for the toaster 
    private router:Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  changePassForm=new FormGroup({
    oldPassword:new FormControl(null,[Validators.required,Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')
    ]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')
    ]),
    confirmNewPassword:new FormControl(null,Validators.required),
  })


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

onChangepass(data:FormGroup){
console.log(data);

this._ChangePassService.onChangepass(data.value).subscribe({
next: (res)=>{
console.log(res);
},
error:(err)=>{
this.toastr.error(err.error.message)
},
complete:()=>{
// here we will add instance from the toaster success
this.toastr.success('Password Changed', 'You have changed your password');
// this.router.navigate(['/auth/reset-password']) // go to dashboard
},
});
}
  
}
