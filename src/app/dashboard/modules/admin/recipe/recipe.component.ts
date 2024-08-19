import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogeComponent } from 'src/app/shared/delete-dialoge/delete-dialoge.component';
import { AddEditCategoryComponent } from '../category/components/add-edit-category/add-edit-category.component';
import { CategoryService } from '../category/services/category.service';
import { RecipeService } from './services/recipe.service';



@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
 //inject category service to use ongetcat()
 constructor( private _categoryServices:CategoryService,
              private _recipeServices:RecipeService,
              private toastr:ToastrService,
            
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

 openAddDialog():void {
   const dialogRef = this.dialog.open(AddEditCategoryComponent, {
     data: {name: this.name,},
   });

   dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed',result);
     if(result){
       this.onAddCat(result);
       this.toastr.success('Success', 'Category Added Succsesfully');
       this.onGetRecipes();
     }
   });
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
// here we take the Id from the elemnt in html while in loop
 openDeleteDialog(myId:number):void {
   const dialogRef = this.dialog.open(DeleteDialogeComponent, {
     //here we send the id for the deleted item
     data: {text: 'Category',id:myId},
   });

   dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed',result);
     if(result){
       this.onDeleteRes(result);
       this.toastr.success('Deleated', 'Recipe Deleated Succsesfully');
       this.onGetRecipes();
     }
   });
 }


 onAddCat(val:string){
   this._categoryServices.addCategory(val).subscribe({
     next:(res)=>{
       console.log(res)
     },
   })
 }

 onDeleteRes(val:any){
   this._recipeServices.onDeleteRecipe(val).subscribe({
     next:(res)=>{
       console.log(res)
     },
   })
 }
}
