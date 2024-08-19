import { inject } from '@angular/core';
import { CanActivateFn, Router,  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const _AuthService = inject(AuthService);
  const _router = inject(Router);
  const toastr = inject(ToastrService);

if(localStorage.getItem('userToken')!==null){
  
  return true;

}
else{
  toastr.error('You are not authorized to view this page','Access Denied')
  _router.navigate(['auth/login']);
  return false;
}
};
