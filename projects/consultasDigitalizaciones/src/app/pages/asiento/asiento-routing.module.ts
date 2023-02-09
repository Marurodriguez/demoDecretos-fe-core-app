import { AsientoListadoComponent } from './listado/asiento-listado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsientoAbmComponent } from './abm/asiento-abm.component';



const routes: Routes = [
  // { path: '',
  //   redirectTo: '/listado',
  //   pathMatch: 'full'
  // },
  {
    path: 'listado',
    component: AsientoListadoComponent,
    pathMatch: 'full',
    data: {
      title: 'Listado'
    }
  },
  {
    path: 'abm/:operation',
    component: AsientoAbmComponent,
    data: {
      title: 'Nuevo Asiento',
      operation: 'new'
    }
  }
  // {
  //   path: 'abm/:operation/:seccion/:uuid',
  //   component: ClientesAbmComponent,
  //   // pathMatch: 'full',
  //   data: {
  //     title: 'Cliente ABM',
  //     operation: 'view'
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsientoRoutingModule { }
