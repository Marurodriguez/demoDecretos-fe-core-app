import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaldoInicialListadoComponent } from './listado/saldo-inicial-listado.component';



const routes: Routes = [
  {
    path: 'listado',
    component: SaldoInicialListadoComponent,
    pathMatch: 'full',
    data: {
      title: 'Listado'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaldoInicialRoutingModule { }
