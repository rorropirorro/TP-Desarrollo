import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CargarProductoComponent } from './cargar-producto/cargar-producto.component';

const routes: Routes = [
  { path: 'producto-detalle', component: ProductoDetalleComponent },
  { path: 'cargar-producto', component: CargarProductoComponent },
  { path: '', redirectTo: '/producto-detalle', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductoDetalleComponent,
    CargarProductoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
export class AppRoutingModule {}
