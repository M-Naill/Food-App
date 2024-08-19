import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../admin/category/services/category.service';
import { RecipeService } from '../../admin/recipe/services/recipe.service';
import { ViewUserComponent } from '../../admin/users/components/view-user/view-user.component';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';
import { FavService } from '../services/fav.service';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss']
})
export class UserRecipesComponent {

 //inject category service to use ongetcat()
 constructor( private _categoryServices:CategoryService,
  private _recipeServices:RecipeService,
  private toastr:ToastrService,
  private _favServices:FavService,

  public dialog: MatDialog){};

//pagination intilizing variables 
length = 50;
pageSize = 10;
pageIndex = 1;
// pageSizeOptions = [5, 10, 25];

hidePageSize = false;
showPageSizeOptions = true;
showFirstLastButtons = true;
disabled = false;

// here listdata should have interface with the return list from the http
listData:any|null;
// value = 'Search Here';
searchKey:string = '';
name:string='';
id:number=0;
listTags:any[]=[];
listCategories:any[]=[];
categoryId:number=0;
tagId:number=0;

// pageEvent: PageEvent;

// this function handle the event and set the paginator variables 
handlePageEvent(e: PageEvent) {
// this.pageEvent = e;
console.log(e);
this.length = e.length;
this.pageSize = e.pageSize;
this.pageIndex = e.pageIndex;
// withe every change we call the api and get the listdata to render it 
this.onGetRecipes();
}
ngOnInit(){
this.onGetRecipes();
this.onGetTags();
this.onGetAllCategories();

}
// this function fire the service getallCategory and provide the pagination info 
onGetRecipes(){
// we will have processing in this function that's why we will intiate the object here 
let dataParams={
pageSize:this.pageSize,
pageNumber:this.pageIndex,
name:this.searchKey,
categoryId:this.categoryId,
tagId:this.tagId
}

this._recipeServices.getAllRecipes(dataParams).subscribe({
next:(res)=>{
console.log(res,"response of api");
//listData has attriibute named data so we loop on it in html
this.listData=res;
console.log(this.listData);
}
})
}
onClearfilter(){
this.searchKey='';
this.onGetRecipes();
}



onGetTags(){
this._recipeServices.getAllTags().subscribe({
next:(res)=>{
console.log(res,'tags');
this.listTags=res;
}
})
}
//here we get the categories ciollection (list) and use 1000 to get all the categories
onGetAllCategories(){
this._categoryServices.getAllCategory({pageSize:1000,pageNumber:1}).subscribe({
next:(res)=>{
console.log(res,'tags');
this.listCategories=res.data;
}
})
}

openViewRecipe(recipe:any){
  console.log(recipe);
  const dialogRef = this.dialog.open(ViewRecipeComponent, {
    data: recipe,
    width:'60%'
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);
    if(result){
      this.onAddToFav(result);
      this.toastr.success('Added to your Favourites', 'Recipe Added Succsesfully');
      this.onGetRecipes();
    }
  });
}

onAddToFav(id:number){
  this._favServices.onAddToFav(id).subscribe({
    next:(res) =>{
      console.log(res,"Favs added");
      
    },
  })

}


}
