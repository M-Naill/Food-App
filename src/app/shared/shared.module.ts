import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DeleteDialogeComponent } from './delete-dialoge/delete-dialoge.component';
import {MatSelectModule} from '@angular/material/select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChangepassDialogeComponent } from './changepass-dialoge/changepass-dialoge.component';
import { ProfileComponent } from './profile/profile.component';





@NgModule({
  declarations: [
    SharedComponent,SidebarComponent,NavbarComponent, HomeComponent, DeleteDialogeComponent, ChangepassDialogeComponent, ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule, // for forms
    RouterModule,
    MatDialogModule, // all the mat for angular material
    MatFormFieldModule,
    FormsModule,MatInputModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    NgxDropzoneModule,
    NgxSpinnerModule,
    
    
    // ToastrModule.forRoot(),
    // BrowserAnimationsModule,
  ],
  exports:[
    RouterModule,ReactiveFormsModule,SidebarComponent,NavbarComponent,MatDialogModule,MatFormFieldModule,FormsModule,MatInputModule,MatPaginatorModule,MatMenuModule,MatIconModule,MatButtonModule,MatSelectModule,NgxDropzoneModule,NgxSpinnerModule

  ]
})
export class SharedModule { }
