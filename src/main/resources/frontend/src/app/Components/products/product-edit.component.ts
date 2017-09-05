/**
 * Created by IntelliJ IDEA.
 * User: Daniel Quiroz
 * Date: 9/5/2017
 * Time: 5:19 PM
 */
import {Component} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../../Services/product.service";
import {Product} from "../../Models/Product";

@Component({
  selector: 'app.product-edit',
  templateUrl: './product-add.component.html',
  providers: [ProductService]
})

export class ProductEditComponent {
  public title: string;
  public product: Product;
  public filesToUpload;
  public resultUpload;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
    this.title ='Editar Producto'
    this.product = new Product(0,'','','',0,'')
  }

  ngOnInit() {
    console.log('Compponent Edit Loaded');
    console.log(this.title)
  }
}
