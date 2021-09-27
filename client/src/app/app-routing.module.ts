import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Menu } from './pages/menu/menu.component';
import { Admin } from './pages/admin/admin.component';
import { NotFound } from './components/shared/not_found/not_found.component';
import { CategoryEditorComponent } from './components/admin-components/category-editor/category-list-editor.component';
import { DishesEditorComponent } from './components/admin-components/dishes-editor/dishes-editor.component';
import { InfoEditorComponent } from './components/admin-components/info-editor/info-editor.component';

const routes: Routes = [
  { path: '', component: Menu },
  {
    path: 'admin',
    component: Admin,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'info' },
      { path: 'categories', component: CategoryEditorComponent },
      { path: 'dishes', component: DishesEditorComponent },
      { path: 'info', component: InfoEditorComponent },
    ],
  },
  { path: '**', component: NotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
