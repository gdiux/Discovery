import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// MODELS
import { Product } from '../models/product.model';

// SERVICES
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class ProductComponent implements OnInit {

  constructor(  private porductService: ProductsService,
                private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({id}) => {
      
      this.cargarProducto(id);
      
    }); 

  }

  /** ================================================================
   *  SCROLL
  ==================================================================== */
  scrollTop(){
    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 50); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }

  /** ================================================================
   *  CARGAR PRODUCTOS
  ==================================================================== */
  public producto: any;
  public stock: any;
  public stock1: number = 0;
  cargarProducto(id: string){

    this.porductService.cargarProductoId(id)
        .subscribe(
          ({ product }) =>{

            this.stock1 = 0;

            this.producto = product;

            this.stock1 = product.stock + ( product.returned || 0 ) + ( product.bought || 0 ) - (product.sold || 0) - ( product.damaged || 0);

            if (this.stock1 === 0) {
              this.stock1 = 1;
            }

            this.scrollTop();
            

            this.stock = Array(this.stock1).fill(1).map((x,i)=>i);    

            this.cargarProductos(this.producto.department._id);
  
          }, (err) => { console.log('Error: ', err); }
          
        );
  }

  /** ================================================================
   *  CARGAR PRODUCTOS POR DEPARTAMENTOS
  ==================================================================== */
  public productos: Product[] | undefined;
  cargarProductos(departamento: string){

    const endPoint = `/products/department/${this.producto.department._id}?hasta=4`;

    this.porductService.cargarProductoDepartamentoEnd(departamento, endPoint)
        .subscribe(({ total, products })=> {

          this.productos = products;

          console.log(this.productos);
          

        });
  }


  // FIN DE LA CLASE
}
