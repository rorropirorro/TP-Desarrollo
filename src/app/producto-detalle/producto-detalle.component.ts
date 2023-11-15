import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent {
  producto: any[] = [];
  precioProducto: number = 0;
  cantidad = 1;
  total = 0;
  constructor(private http: HttpClient, private location: Location) {
    this.cargarDatos();
  }
  
  cargarDatos(){
    this.http.get('assets/data.json').subscribe((data: any) => {
      this.producto = data;
      this.precioProducto = this.producto[0].precio;
      this.actualizarTotal();
    });
  }

  comprar(){
    console.log("hola amigos de youtube")
  }

  cancelar(){
    this.location.back();
  }

  volverAtras() {
    this.location.back();
  }
  
  actualizarTotal() {
    this.total = this.precioProducto * this.cantidad;
  }

}
