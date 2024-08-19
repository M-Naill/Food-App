import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private _HttpClient:HttpClient) { }

  //this function for httprequest  it takes params which contain the page number and size 
  getAllRecipes(myParams:any) : Observable<any> {

    return this._HttpClient.get('Recipe',{params:myParams});
  }

  getRecipeById(id:number) : Observable<any> {

    return this._HttpClient.get(`recipe/${id}`);
  }
 

  getAllTags() : Observable<any> {

    return this._HttpClient.get('Tag');
  }

  onAddRecipe(data:FormData) : Observable<any> {

    return this._HttpClient.post('Recipe',data);
  }

  onEditRecipe(data:FormData,id:number) : Observable<any> {

    return this._HttpClient.put(`Recipe/${id}`,data);
  }

  onDeleteRecipe(itemid:any) : Observable<any> {
    console.log(itemid, 'data before send the')

    return this._HttpClient.delete(`Recipe/${itemid}`);
  }

}