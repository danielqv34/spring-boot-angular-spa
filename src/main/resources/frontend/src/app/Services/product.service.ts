/**
 * Created by IntelliJ IDEA.
 * User: Daniel Quiroz
 * Date: 8/23/2017
 * Time: 4:22 PM
 */
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Product} from "../Models/Product";
import {Global} from "./Global";

@Injectable()
export class ProductService {

  protected url: string;

  constructor( public _http: Http) {
    this.url = Global.url;
  }

  getProducts(){
    return this._http.get(this.url+'/getAllProducts').map(res => res.json());
  }

  addProduct(product:Product){
    let json  = JSON.stringify(product);
    let params = json;
    let headers = new Headers({'Content-Type':'applicattion/json'});
    console.log('Producto: '+params)
    return this._http.post(this.url+'/saveProduct', params, {headers:headers}).map(res => res.json());
  }

}
