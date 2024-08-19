import { Component } from '@angular/core';
import { FavService } from '../services/fav.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss']
})
export class FavComponent {

  constructor(private _FavService:FavService){

  }

  ngOnInit():void{
    this.onGetAllFavs();
  }

  length = 50;
pageSize = 10;
pageIndex = 1;
// pageSizeOptions = [5, 10, 25];

hidePageSize = false;
showPageSizeOptions = true;
showFirstLastButtons = true;
disabled = false;
  listData:any;

  handlePageEvent(e: PageEvent) {
    // this.pageEvent = e;
    console.log(e);
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    // withe every change we call the api and get the listdata to render it 
    this.onGetAllFavs();
    }

  onGetAllFavs(){
    this._FavService.onGetUserFavs().subscribe({
      next:(res)=>{
        console.log(res , "before adding to favs");;
        this.listData=res;
      },
    })
  }

onDeleteFav(id:number){
  this._FavService.onDeleteFavItem(id).subscribe({
    next:(res)=>{
      console.log(res);
    },error:()=>{

    },complete:()=>{
      this.onGetAllFavs();
    }

  })

}
}
