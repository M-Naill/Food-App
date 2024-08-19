import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CategoryService } from './services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogeComponent } from 'src/app/shared/delete-dialoge/delete-dialoge.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  //inject category service to use ongetcat()
  constructor(private _categoryServices:CategoryService,private toastr:ToastrService,public dialog: MatDialog){};

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
  name:any='';
  id:number=0;

  // pageEvent: PageEvent;

  // this function handle the event and set the paginator variables 
  handlePageEvent(e: PageEvent) {
    // this.pageEvent = e;
    console.log(e);
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    // withe every change we call the api and get the listdata to render it 
    this.onGetCat();
  }
  ngOnInit(){
    this.onGetCat();
  }
  // this function fire the service getallCategory and provide the pagination info 
  onGetCat(){
    this._categoryServices.getAllCategory({pageSize:this.pageSize,pageNumber:this.pageIndex,name:this.searchKey}).subscribe({
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
    this.onGetCat();
  }

  openAddDialog(cat?:any):void {
    console.log(cat.name,"did i recived the name ?");
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: {name: cat.name,},
      
    });
console.log(this.name,"recived from the click")
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result){
        this.onAddCat(result);
        this.toastr.success('Success', 'Category Added Succsesfully');
        this.onGetCat();
      }
    });
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
        this.onDeleteCat(result);
        this.toastr.success('Deleated', 'Category Deleated Succsesfully');
        this.onGetCat();
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


  onEditCat(val:string){
    this._categoryServices.addCategory(val).subscribe({
      next:(res)=>{
        console.log(res)
      },
    })
  }



  onDeleteCat(val:any){
    this._categoryServices.deleteCategory(val).subscribe({
      next:(res)=>{
        console.log(res)
      },
    })
  }
}
