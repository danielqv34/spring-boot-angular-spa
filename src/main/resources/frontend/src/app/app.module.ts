import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HomeComponent} from './Components/Home/home.component';
import {ProductList} from "./Components/products/product-list";
import {ProductAddComponent} from "./Components/products/product-add.component"
import {ErrorComponent} from "./Components/error/error.component";

@NgModule({
  declarations: [
    AppComponent, HomeComponent, ErrorComponent, ProductList , ProductAddComponent
  ],
  imports: [
    BrowserModule , routing , HttpModule , FormsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
