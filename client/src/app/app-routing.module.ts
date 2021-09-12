import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Menu } from './pages/menu/menu.component';
import { Admin } from './pages/admin/admin.component';
import { Error404 } from './components/shared/error404/error404.component';

const routes: Routes = [
  { path: '', component: Menu },
  { path: 'admin', component: Admin },
  { path: '**', component: Error404 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
