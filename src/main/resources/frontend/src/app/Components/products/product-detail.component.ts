/**
 * Created by IntelliJ IDEA.
 * User: Daniel Quiroz
 * Date: 9/5/2017
 * Time: 11:09 AM
 */
import {Component} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap'
import {ProductService} from "../../Services/product.service";
import {Product} from "../../Models/Product";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  viewProviders: [ProductService]
})
export class ProductDetailComponent {
  title: string = 'Detalle Producto';
  public product: Product;
  id: number;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    console.log('Component ' + this.title + ' loaded!!');
    // this.route.params.switchMap((params: Params) => this.productService.getProductById(params['id']))
    //   .subscribe(
    //     result => {
    //       this.product.id = result.id;
    //     }
    //   );
    this.getProductById();
  }

  getProductById() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.productService.getProductById(id).subscribe(
        product => this.product = product,
        response => {
          if (response.status == 404) {
            this.router.navigate(['NotFound']);
          }
        });
    });
  }
}

