import { NgModule } from '@angular/core';

import { DecretoRoutingModule } from './decreto-routing.module';
import { ListadoComponent } from  './listado/listado.component';
import { EditarComponent } from './editar/editar.component';
import { AgregarComponent } from  './agregar/agregar.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ListadoComponent,
    EditarComponent,
    AgregarComponent,
    InicioComponent
  ],
  imports: [
    DecretoRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: []
})
export class DecretoModule { }
