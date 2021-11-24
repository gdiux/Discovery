import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// SERIVES
import { SearchService } from '../services/search.service';
import { DepartmentService } from '../services/department.service';

// MODELS
import { Product } from '../models/product.model';
import { Department } from '../models/department.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public desde: number = 0;
  public hasta: number = 10;
  public tipo: string = '';
  public termino: string = '';

  constructor(  private router: Router,
                private activatedRoute: ActivatedRoute,
                private searchService: SearchService,
                private departmentService: DepartmentService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({tipo, termino}) => {

      this.tipo = tipo;
      this.termino = termino;
      
      this.buscador();
      
    });

    this.cargarDepartamento();

  }

  /** ================================================================
   *   BUSCAR
  ==================================================================== */
  public productos: Product[] = [];
  public total: number = 0;

  public btnAtras: string = 'false';
  public btnAdelante: string = 'true';

  buscador(){

    this.searchService.search(this.tipo, this.termino, this.desde, this.hasta)
        .subscribe( ({resultados}) => {
          
          this.productos = resultados;
          this.total = resultados.length;          
          
        });
  }

  /** ================================================================
   *  CAMBIAR PAGINA
  ==================================================================== */
  cambiarPagina(valor: number){

    this.desde += valor;    

    if (this.desde < 0) {
      this.desde = 0;
    }
    this.buscador();

  }

  /** ================================================================
   *  CARGAR DEPARTAMENTOS
  ==================================================================== */
  public departamentos: Department[] = [];
  cargarDepartamento(){

    this.departmentService.loadDepartment( this.desde, this.hasta )
        .subscribe(({ total, departments }) =>{

          this.departamentos = departments;

        }, (err) => {  }
        
        )

  }

  /** ================================================================
   *  BUSCAR PRODUCTOS
  ==================================================================== */
  buscarProductos(termino:string){

    if (termino.length === 0) {
      return;
    }  

    // INGRESAR
    this.router.navigateByUrl(`/search/producto/${termino}`);

  }

}
