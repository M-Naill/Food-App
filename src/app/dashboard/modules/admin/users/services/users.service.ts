import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient:HttpClient) { }

  getUsers(myParams:any) : Observable<any> {

    return this._HttpClient.get('Users',{params:myParams});
  }


  deleteUser(itemid:any) : Observable<any> {
    console.log(itemid, 'data before send the')

    return this._HttpClient.delete(`Users/${itemid}`);
  }
}
