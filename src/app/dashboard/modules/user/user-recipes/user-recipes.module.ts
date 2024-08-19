import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRecipesRoutingModule } from './user-recipes-routing.module';
import { UserRecipesComponent } from './user-recipes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';


@NgModule({
  declarations: [
    UserRecipesComponent,
    ViewRecipeComponent
  ],
  imports: [
    CommonModule,
    UserRecipesRoutingModule,
    SharedModule
  ]
})
export class UserRecipesModule { }
