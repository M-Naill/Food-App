import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }

  //this function for httprequest  it takes params which contain the page number and size 
  getAllCategory(myParams:any) : Observable<any> {

    return this._HttpClient.get('Category',{params:myParams});
  }

  addCategory(data:string) : Observable<any> {

    return this._HttpClient.post('Category',{name:data});
  }

  editCategory(data:string,id:number) : Observable<any> {

    return this._HttpClient.put(`Category/${id}`,{name:data});
  }

  deleteCategory(itemid:any) : Observable<any> {
    console.log(itemid, 'data before send the')

    return this._HttpClient.delete(`Category/${itemid}`);
  }
}

