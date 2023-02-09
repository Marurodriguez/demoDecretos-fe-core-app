import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';
import { DocumentoListadoComponent } from './listado/documento-listado.component';



const routes: Routes = [
  {
    path: 'listado',
    component: DocumentoListadoComponent,
    pathMatch: 'full',
    data: {
      title: 'Listado'
    }
  },
  {
    path: 'detalle/:documento_uuid',
    component: DetalleComponent,
    pathMatch: 'full',
    data: {
      title: 'Detalle'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentoRoutingModule { }
