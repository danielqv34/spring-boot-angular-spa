/**
 * Created by IntelliJ IDEA.
 * User: Daniel Quiroz
 * Date: 8/23/2017
 * Time: 4:10 PM
 */

import {Component} from "@angular/core";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})

export class ErrorComponent {
  public title: string;

  constructor(){
    this.title = 'Error 404!! Pagina no Encontrada '
  }

  ngOnInit(){
    console.log('Error 404')
  }

}
