import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';

import {AppComponent} from './app.component';
import {HomeComponent} from './Components/Home/home.component';
import {ProductList} from "./Components/products/product-list";
import {ErrorComponent} from "./Components/error/error.component";

@NgModule({
  declarations: [
    AppComponent, HomeComponent, ErrorComponent, ProductList
  ],
  imports: [
    BrowserModule , routing , HttpModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
