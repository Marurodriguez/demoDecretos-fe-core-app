import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BancoListadoComponent } from './listado/banco-listado.component';



const routes: Routes = [
  {
    path: 'listado',
    component: BancoListadoComponent,
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
export class BancoRoutingModule { }
