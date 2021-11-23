import { Component, OnInit } from '@angular/core';

// SERVICES
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(  private porductService: ProductsService) { }

  ngOnInit(): void {

    // CARGAR PRODUCTOS TOP
    this.cargarProductosTop();
    
  }

  /** ================================================================
   *   CARGAR PRODUCTOS MAS VENDIDOS
  ==================================================================== */
  public productos: Product[] = [];
  cargarProductosTop(){

    const endPoint = '/products?desde=0&tipo=top&limite=20';

    this.porductService.cargarProductosEnd(0, endPoint)
        .subscribe(
          ({ total, products }) =>{

            this.productos = products;            
  
          }, (err) => { console.log('Error: ', err); }
          
        );
  }

  /** ================================================================
   *   CARGAR PRODUCTOS MAS VENDIDOS
  ==================================================================== */

}
