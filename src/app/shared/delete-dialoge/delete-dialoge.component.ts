import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditCategoryComponent } from 'src/app/dashboard/modules/admin/category/components/add-edit-category/add-edit-category.component';

@Component({
  selector: 'app-delete-dialoge',
  templateUrl: './delete-dialoge.component.html',
  styleUrls: ['./delete-dialoge.component.scss']
})
export class DeleteDialogeComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
