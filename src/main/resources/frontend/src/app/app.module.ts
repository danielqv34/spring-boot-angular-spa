import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HomeComponent} from './Components/Home/home.component';
import {ProductList} from "./Components/products/product-list";
import {ProductAddComponent} from "./Components/products/product-add.component"
import {ProductDetailComponent} from "./Components/products/product-detail.component";
import {ErrorComponent} from "./Components/error/error.component";
import {ProductEditComponent} from "./Components/products/product-edit.component";

@NgModule({
  declarations: [
    AppComponent, HomeComponent, ErrorComponent, ProductList , ProductAddComponent ,
    ProductDetailComponent, ProductEditComponent
  ],
  imports: [
    BrowserModule , routing , HttpModule , FormsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
