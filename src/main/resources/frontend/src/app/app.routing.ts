/**
 * Created by IntelliJ IDEA.
 * User: Daniel Quiroz
 * Date: 8/23/2017
 * Time: 4:10 PM
 */

import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./Components/Home/home.component";
import {ErrorComponent} from "./Components/error/error.component";
import {ProductList} from "./Components/products/product-list";
import {ProductAddComponent} from "./Components/products/product-add.component"
import {ProductDetailComponent} from "./Components/products/product-detail.component";

const appRoutes
  :Routes=[
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'product-list', component: ProductList},
  {path: 'product-add', component: ProductAddComponent},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: '**', component:ErrorComponent}
];


export const appRoutingProviders:any [] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
