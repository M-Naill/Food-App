import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VerfiyComponent } from '../verfiy/verfiy.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  errorMessage:string = '';
  registerForm=new FormGroup({
    email:new FormControl(null, [Validators.required,Validators.email]),
    userName:new FormControl(null,Validators.required),
    phoneNumber:new FormControl(null,Validators.required),
    country:new FormControl(null,Validators.required),
    profileImage:new FormControl(null),
    password:new FormControl(null,[Validators.required,Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')
    ]),
    confirmPassword:new FormControl(null,Validators.required),
  });
  //flag for eye icon password
  isHide:boolean=true;
  isHidee:boolean=true;
  // declare variable to store the file in it
  imgSrc:any;

  //declare and intlize code to send it to the service to verify 
  code:string='';

  files: File[] = [];

  constructor(private _AuthService:AuthService ,
              private toastr:ToastrService,
              private router:Router,
              public dialog: MatDialog
            ){ }
            
  openDialog(): void {
    //here we chose the componenet that will be open as dialoge
    const dialogRef = this.dialog.open(VerfiyComponent, {
      //here we can send data to the dialog so we send the user email for good experience
      data: {email: this.registerForm.value.email,code:this.code},
              });
          
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
         // this.animal = result;
         // here we use if to make sure we have result
         if(result){
           this.onVerify(result);
                }
              });
            }

// here we need to take instance from onverifyaccount in auth service to verify
  onVerify(data:any){
    this._AuthService.onVerifyAccount(data).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(err)=>{
        this.toastr.error(err.error.message)
      },
      complete:()=>{
        this.toastr.success("Account verified succefully");
        this.router.navigate(['/dashboard'])
      }
    })
  }

  onRegister(data:FormGroup){
    console.log(data); // data as json { }
    //data json => formdata
    // here we take instance from FormData and append all the keys from api and values from form on register
    let myFormData = new FormData();
    myFormData.append("email",data.value.email)
    // with append the data should be string so we need to parse the data to string
    myFormData.append("userName",data.value.userName)
    myFormData.append("phoneNumber",data.value.phoneNumber)
    myFormData.append("country",data.value.country)
    myFormData.append("profileImage",this.imgSrc)
    myFormData.append("password",data.value.password)
    myFormData.append("confirmPassword",data.value.confirmPassword)

    this._AuthService.onRegister(myFormData).subscribe({
      next: (res)=>{
        console.log(res);
        localStorage.setItem('userToken',res.token)
        this._AuthService.getProfile();
      },
      error:(err)=>{
        this.toastr.error(err.error.message)
      },
      complete:()=>{
        this.toastr.success('Account Added succesfully ', 'Welcome');
        this.openDialog();
      },
    });
  }

 

  //this function catch the event and push it in files array
onSelect(event:any) {
  console.log(event);
  this.files.push(...event.addedFiles);
  console.log(this.files)
  // here we add the file to intilize the variable 
  this.imgSrc=this.files[0]
  // if we want we can render here to base 64
}

onRemove(event:any) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
}
