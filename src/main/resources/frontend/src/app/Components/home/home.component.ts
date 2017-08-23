/**
 * Created by IntelliJ IDEA.
 * User: Daniel Quiroz
 * Date: 8/23/2017
 * Time: 4:10 PM
 */

import {Component} from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  public title: string;

  constructor() {
    this.title = 'Inicio'
  }

  ngOnInit() {
    console.log('Componente Home cargado!!');
  }
}
