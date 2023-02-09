import { CuentaContableListadoComponent } from './listado/cuentacontable-listado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  // { path: '',
  //   redirectTo: '/listado',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: CuentaContableListadoComponent,
    pathMatch: 'full',
    data: {
      title: 'Listado'
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
export class CuentaContableRoutingModule { }
