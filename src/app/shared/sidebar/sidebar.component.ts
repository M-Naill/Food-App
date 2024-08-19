import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ChangepassDialogeComponent } from '../changepass-dialoge/changepass-dialoge.component';
import { MatDialog } from '@angular/material/dialog';
interface IMenu{
  text:string,
  icon:string,
  link:string,
  isActive:boolean,
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

 
// declare and intilize object to use it in html directive
  menuLinks:IMenu[] = [{
    text:'Home',
    icon:'fa-solid fa-home',
    link:'/dashboard/home',
    // flag to show the item depend on user role
    isActive:true
  },
  {
    text:'Users',
    icon:'fa-solid fa-user-group',
    link:'/dashboard/admin/users',
    isActive:this.isAdmin(),
  },
  {
    text:'Recipes',
    icon:'fa-solid fa-utensils',
    link:'/dashboard/admin/recipe',
    isActive:this.isAdmin(),
  },
  {
    text:'Categories',
    icon:'fa-solid fa-list',
    link:'/dashboard/admin/category',
    isActive:this.isAdmin(),
  },
  {
    text:'Favs',
    icon:'fa-solid fa-heart',
    link:'/dashboard/user/fav',
    isActive:this.isUser(),
  },
  {
    text:'User Recipes',
    icon:'fa-solid fa-bowl-food',
    link:'/dashboard/user/user-recipes',
    isActive:this.isUser(),
  },
  {
    text:'Change Password',
    icon:'fa-solid fa-unlock-keyhole',
    link:'1',
    isActive:true
  },];

constructor(private _AuthService:AuthService , public dialog: MatDialog){}

// function that check the role 
isAdmin():boolean{
  return this._AuthService.role=='SuperAdmin'?true:false;
}
isUser():boolean{
  return this._AuthService.role=='SystemUser'?true:false;
}

// function for log out called from authservice 


openChangePassDialoge(event: Event):void {
  event.preventDefault();
  const dialogRef = this.dialog.open(ChangepassDialogeComponent, {
    //here we send the id for the deleted item
    data: {text: 'User'},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);
    // if(result){
    //   this.onDeleteUser(result);
    //   this.toastr.success('Deleated', 'User Deleated Succsesfully');
    //   this.onGetUsers();
    // }
  });
}

}
