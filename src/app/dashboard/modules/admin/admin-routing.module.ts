import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [{ path: '', component: AdminComponent, children:[
{ path: 'recipe', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule) },
{ path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)},
{ path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  ], },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
