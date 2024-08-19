import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePassService {

  constructor(private _HttpClient:HttpClient) { }


  onChangepass(data:any) : Observable<any> {

    return this._HttpClient.put('Users/ChangePassword',data);
  }
}
