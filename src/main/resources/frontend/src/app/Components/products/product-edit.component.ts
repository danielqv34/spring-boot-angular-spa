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
import {Global} from "../../Services/Global";

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
  public isEdit;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
    this.title = 'Editar Producto';
    this.product = new Product(0, '', '', '', 0, '');
    this.isEdit = true;
  }

  ngOnInit() {
    console.log('Compponent Edit Loaded');
    console.log(this.title);
    this.getProductById();
  }

  getProductById() {
    let id = this.route.params.subscribe(params => {
      let id = params['id'];

      this.productService.getProductById(id).subscribe(
        product => this.product = product,
        response => {
          if (response.status == 404) {
            this.router.navigate(['/products']);
          }
        });
    });
  }

  onSubmit() {

    if (this.filesToUpload && this.filesToUpload.length >= 1) {
      this.productService.makeFileRequest(Global.url, [], this.filesToUpload).then((result) => {
        console.log(result);
        this.resultUpload = result;
        this.product.image = this.resultUpload.fileName;
        this.updateProduct();
        console.log(this.resultUpload.fileName);
      }, (error) => {
        console.log(error);
      });
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    let id = this.route.params.subscribe(params => {
      let id = params['id'];
      console.log('ID Producto: ' + id);
      console.log('ID Producto: ' + this.product);
      this.productService.updateProduct(id, this.product).subscribe(
        res => {
            this.router.navigate(['/product-detail', id]);
            console.log('Producto Editado')
        }, error => {
          console.log(<any> error)
        }
      );
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.files;
    console.log(this.filesToUpload);
  }
}
