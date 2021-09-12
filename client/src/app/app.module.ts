import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Menu } from './pages/menu/menu.component';
import { Admin } from './pages/admin/admin.component';
import { Header } from './components/shared/header/header.component';
import { Error404 } from './components/shared/error404/error404.component';

@NgModule({
  declarations: [AppComponent, Admin, Menu, Header, Error404],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
