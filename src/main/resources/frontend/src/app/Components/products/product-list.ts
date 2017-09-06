/**
 * Created by IntelliJ IDEA.
 * User: Daniel Quiroz
 * Date: 8/23/2017
 * Time: 4:22 PM
 */
import {Component} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../../Services/product.service";
import {Product} from "../../Models/Product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductService]
})

export class ProductList {
  public title: string;
  public allProducts: Array<Product>;
  public confirmDelete:any = null;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _productService: ProductService) {
    this.title = 'Catalogo de Productos'
  }

  ngOnInit() {
    console.log('Componente de Productos Loaded');
    this.getProducts();

  }

  getProducts() {
    this._productService.getProducts().subscribe(
      result => {
        this.allProducts = result;
        console.log(this.allProducts);
      }, error => {
        console.log(<any>error);
      }
    )
  }

  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe(res => {
      // if (res = 200) {
        this.getProducts();
      // }
    }, error => {
      console.log(error)
    });
  }

  deleteConfirm(id:number){
    this.confirmDelete = id;
  }
  cancelDelete(){
    this.confirmDelete = null;
  }
}
