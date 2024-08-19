import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CategoryService } from '../../../category/services/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss']
})
export class AddEditRecipeComponent {
  listCategories:any[]=[];
  files: File[] = [];
  // to hold teh recipe data to show it in the form 
  recipeData:any;
  categoryId:number=0;
  tagId:number=0;
  imgSrc:any;

  recipeForm=new FormGroup({
    name:new FormControl(null, Validators.required),
    description:new FormControl(null,Validators.required),
    price:new FormControl(null,Validators.required),
    tagId:new FormControl(null,Validators.required),
    recipeImage:new FormControl(null),
    categoriesIds:new FormControl(null,),  
  });
  pageId:number=0

  constructor(private _recipeServices:RecipeService ,
              private _categoryServices:CategoryService,
              // here we add activated route to get the id from url
              private _Activatedroute:ActivatedRoute
             ){
                  this.pageId=_Activatedroute.snapshot.params['id'];
                  console.log(this.pageId)
                  if(this.pageId){
                    this.getRecipeById(this.pageId)
                  }
              }
  ngOnInit(){
    this.onGetTags();
    this.onGetAllCategories();

  }
  listTags:any[]=[];

  getRecipeById(id:number){

    this._recipeServices.getRecipeById(id).subscribe({
      next:(res)=>{
        console.log(res,'recipe object');
        this.recipeData=res;
      },error:()=>{

      },complete:()=>{

        this.recipeForm.patchValue({
          name:this.recipeData.name,
          description:this.recipeData.description,
          price:this.recipeData.price,
          tagId:this.recipeData.tag.id,
          recipeImage:this.recipeData.recipeImage,
          categoriesIds:this.recipeData.category.map((c:any)=>c.id),
        });

      }
    })

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
// this function call the http request so we willl make it add and edit
  onSendData(data:FormGroup){
    console.log(data);
    let myFormData = new FormData();
    myFormData.append("name",data.value.name)
    // with append the data should be string so we need to parse the data to string
    myFormData.append("description",data.value.description )
    myFormData.append("price",data.value.price )
    myFormData.append("tagId",data.value.tagId )
    myFormData.append("profileImage",this.imgSrc)
    myFormData.append("categoriesIds",data.value.categoriesIds)
   
    if(this.pageId){
      
      this._recipeServices.onEditRecipe(myFormData,this.pageId).subscribe({
        next:(res)=>{
          console.log(res)

        },error:()=>{

        }
      })
    }else{
      this._recipeServices.onAddRecipe(myFormData).subscribe({
        next:(res)=>{
          console.log(res)
        }
      })
    }
  
  }
}
