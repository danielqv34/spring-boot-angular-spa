/**
 * Created in IntelliJ IDEA.
 * User: Daniel QuirozV
 * Date: 8/23/2017
 * Time: 7:57 PM
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../../Services/product.service";
import {Product} from "../../Models/Product";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  providers: [ProductService]
})

export class ProductAddComponent{
  title:string;
  public product:Product;

  constructor(private _productService:ProductService,
              private _router:Router,
              private _route: ActivatedRoute
              ){
    this.title = 'Agregar Producto';
    this.product = new Product();
  }

  ngOnInit(){
    console.log('Componente Product Add loaded!!')
  }

  addProduct(){
    this._productService.addProduct(this.product).subscribe(
      res =>{
            this._router.navigate(['/product/list'])
      },error2 => {
        console.log(<any> error2)
      }
    );
    console.log(this.product);
  }
}
