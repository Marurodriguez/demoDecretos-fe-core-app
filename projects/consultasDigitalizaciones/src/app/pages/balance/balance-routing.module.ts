import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './listado/balance.component';



const routes: Routes = [
  {
    path: 'listado',
    component: BalanceComponent,
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
export class BalanceRoutingModule { }
