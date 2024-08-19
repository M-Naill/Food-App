import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';




@NgModule({
  declarations: [
    CategoryComponent,
    AddEditCategoryComponent
    
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule
    
   
  ],

})
export class CategoryModule { }
