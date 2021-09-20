import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Menu } from './pages/menu/menu.component';
import { Admin } from './pages/admin/admin.component';
import { NotFound } from './components/shared/not_found/not_found.component';

const routes: Routes = [
  { path: '', component: Menu },
  { path: 'admin', component: Admin },
  { path: '**', component: NotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
