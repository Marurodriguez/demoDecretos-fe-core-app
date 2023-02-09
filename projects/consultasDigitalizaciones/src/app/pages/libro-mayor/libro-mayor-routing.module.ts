import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibroMayorComponent } from './listado/libro-mayor.component';



const routes: Routes = [
  {
    path: 'listado',
    component: LibroMayorComponent,
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
export class LibroMayorRoutingModule { }
