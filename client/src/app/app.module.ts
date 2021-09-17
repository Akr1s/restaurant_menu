import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Menu } from './pages/menu/menu.component';
import { Admin } from './pages/admin/admin.component';
import { Header } from './components/shared/header/header.component';
import { NotFound } from './components/shared/not_found/not_found.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CategoriesComponent } from './components/menu-components/categories/categories.component';
import { DishesComponent } from './components/menu-components/dishes/dishes.component';
import { SingleCategoryComponent } from './components/menu-components/single-category/single-category.component';
import { DishesListComponent } from './components/menu-components/dishes-list/dishes-list.component';
import { DishItemComponent } from './components/menu-components/dish-item/dish-item.component';

@NgModule({
  declarations: [
    AppComponent,
    Admin,
    Menu,
    Header,
    NotFound,
    FooterComponent,
    CategoriesComponent,
    DishesComponent,
    SingleCategoryComponent,
    DishesListComponent,
    DishItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
