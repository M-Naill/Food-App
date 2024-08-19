import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DeleteDialogeComponent } from 'src/app/shared/delete-dialoge/delete-dialoge.component';
import { UsersService } from './services/users.service';
import { ToastrService } from 'ngx-toastr';
import { ViewUserComponent } from './components/view-user/view-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  length = 50;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  searchKey:string = '';
  selectFilter:string = '';
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  listData:any;
  groups:number|string= '';


  constructor(public dialog: MatDialog, private _UsersServices:UsersService,private toastr:ToastrService){
    this.onGetUsers()
  }

  onGetUsers(){
    let dataParams={
      pageSize:this.pageSize,
      pageNumber:this.pageIndex,
      [this.selectFilter]:this.searchKey,
      groups:this.groups
      }
      console.log(dataParams)
    this._UsersServices.getUsers(dataParams).subscribe({
      next:(res)=>{
        console.log(res)
        this.listData=res;

      },
    })

  }

  onClearfilter(){
    this.searchKey='';
    this.onGetUsers();
  }

  handlePageEvent(e: PageEvent) {
    // this.pageEvent = e;
    console.log(e);
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    // withe every change we call the api and get the listdata to render it 
    this.onGetUsers();
  }


  openViewUserDialog(userData:any):void {
    const dialogRef = this.dialog.open(ViewUserComponent, {
      //here we send the id for the deleted item
      data: userData,
    });
 
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed',result);
    //   if(result){
    //     this.onDeleteUser(result);
    //     this.toastr.success('Deleated', 'User Deleated Succsesfully');
    //     this.onGetUsers();
    //   }
    // });
  }

  onDeleteUser(val:any){
    this._UsersServices.deleteUser(val).subscribe({
      next:(res)=>{
        console.log(res)
      },
    })
  }

  openDeleteDialog(myId:number):void {
    const dialogRef = this.dialog.open(DeleteDialogeComponent, {
      //here we send the id for the deleted item
      data: {text: 'User',id:myId},
    });
 
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result){
        this.onDeleteUser(result);
        this.toastr.success('Deleated', 'User Deleated Succsesfully');
        this.onGetUsers();
      }
    });
  }

}
