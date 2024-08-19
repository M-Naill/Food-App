import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  
  const _AuthService = inject(AuthService);
  const _router = inject(Router);

  if(localStorage.getItem('userToken')!==null && _AuthService.role == 'SystemUser'){
  
    return true;
  
  }
  else{
    _router.navigate(['auth/login']);
    return false;
  }
};
