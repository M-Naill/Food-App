import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-verfiy',
  templateUrl: './verfiy.component.html',
  styleUrls: ['./verfiy.component.scss']
})
export class VerfiyComponent {

  userName:string=''
  constructor(
    //here we set this component to be on the dialoge
    public dialogRef: MatDialogRef<VerfiyComponent>,
    // here we inject the data to the pop up 
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    console.log('verify pop up',data)
    this.userName = data.name
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
