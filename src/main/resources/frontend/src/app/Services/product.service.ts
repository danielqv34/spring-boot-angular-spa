/**
 * Created by IntelliJ IDEA.
 * User: Daniel Quiroz
 * Date: 8/23/2017
 * Time: 4:22 PM
 */
import {Injectable} from "@angular/core";
import {Http, Response, URLSearchParams, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";
import {Product} from "../Models/Product";
import {Global} from "./Global";

@Injectable()
export class ProductService {

  protected url: string;

  constructor(public _http: Http) {
    this.url = Global.url;
  }

  getProducts() {
    return this._http.get(this.url + 'getAllProducts').map(res => res.json());
  }

  addProduct(product: Product): Observable<number> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});
    console.log("SEND PRODUCT: " + product);
    return this._http.post(this.url + 'saveProduct', product).map(sucess => sucess.status);

  }


  getProductById(id) {
    return this._http.get(this.url + 'getProductById/' + id).map(success => success.json());
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) {
        formData.append('file',files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open("POST", url + 'uploadImage', true);
      xhr.send(formData);
    });
  }


}
