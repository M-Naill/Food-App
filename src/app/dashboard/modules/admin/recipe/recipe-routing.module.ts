import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe.component';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';

const routes: Routes = [{ path: '', component: RecipeComponent },
  {path:'add', component: AddEditRecipeComponent},
  {path:'edit/:id', component:AddEditRecipeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
