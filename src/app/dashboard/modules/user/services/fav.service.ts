import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(private _HttpClient:HttpClient) { }


  onAddToFav(itemid:number) : Observable<any> {
    console.log(itemid, 'data before added to recipe')

    return this._HttpClient.post('userRecipe',{recipeId:itemid});
  }

  onGetUserFavs():Observable<any>{
    return this._HttpClient.get('userRecipe');
  }

  onDeleteFavItem(id:number):Observable<any>{
    return this._HttpClient.delete(`userRecipe/${id}`);
  }
}
