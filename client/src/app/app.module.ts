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
import { InfoPopupComponent } from './components/menu-components/info-popup/info-popup.component';
import { ButtonComponent } from './components/shared/button/button.component';
import { CategoryItemsComponent } from './components/admin-components/category-list-items/category-list-items.component';
import { CategoryDetailsComponent } from './components/admin-components/category-details/category-details.component';
import { CategoryEditorComponent } from './components/admin-components/category-editor/category-list-editor.component';
import { DishesEditorComponent } from './components/admin-components/dishes-editor/dishes-editor.component';
import { DishesListItemsComponent } from './components/admin-components/dishes-list-items/dishes-list-items.component';
import { DishDetailsComponent } from './components/admin-components/dish-details/dish-details.component';
import { InfoEditorComponent } from './components/admin-components/info-editor/info-editor.component';
import { InfoViewComponent } from './components/admin-components/info-view/info-view.component';
import { InfoFormComponent } from './components/admin-components/info-form/info-form.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    InfoPopupComponent,
    ButtonComponent,
    CategoryEditorComponent,
    CategoryItemsComponent,
    CategoryDetailsComponent,
    DishesEditorComponent,
    DishesListItemsComponent,
    DishDetailsComponent,
    InfoEditorComponent,
    InfoViewComponent,
    InfoFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
