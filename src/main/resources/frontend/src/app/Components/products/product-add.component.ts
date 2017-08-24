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
import {Global} from "../../Services/Global";
import {error} from "util";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  providers: [ProductService]
})

export class ProductAddComponent {
  title: string;
  public product: Product;
  public fileToUplodad;
  public resultUpload;
  public successMsg:string;

  constructor(private _productService: ProductService,
              private _router: Router,
              private _route: ActivatedRoute) {
    this.title = 'Agregar Producto';
    this.product = new Product(0, '', '', '', 0, '');
  }

  ngOnInit() {
    console.log('Componente Product Add loaded!!')
  }

  onSubmit() {
    // this._productService.makeFileRequest(Global.url , [], this.fileToUplodad).then((result) => {
    //     console.log(result);
    //   }, (error) => {
    //     console.log(error);
    //   });
    if (this.fileToUplodad !== undefined) {
      this._productService.makeFileRequest(this.fileToUplodad).then(responce => {

      }),(error) => {
        error = error
      };
      setTimeout(() => {
        this.successMsg = "Successfully uploaded !!";
      }, 10000);
    } else {
      //show error
    }
    this._productService.addProduct(this.product).subscribe(
      res => {
        if (res == 201) {
          this._router.navigate(['product-list'])
        }
      }, error => {
        console.log(<any> error)
      }
    );

  }

  fileChangeEvent(fileInput: any) {
    this.fileToUplodad = <Array<File>>fileInput.files;
    // let empDataFiles: FileList = fileInput.files;
    // this.fileToUplodad = empDataFiles[0];
    console.log(this.fileToUplodad);
  }
}
