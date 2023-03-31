import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgregarComponent } from './agregar/agregar.component';
import { EditarComponent } from './editar/editar.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListadoComponent } from './listado/listado.component';

const routes: Routes = [
  {path:'', redirectTo:'decreto/listado', pathMatch:'full'},

  {path:'inicio', component:InicioComponent},
  {path:'listado', component:ListadoComponent},
  {path:'editar/:id', component: EditarComponent},
  {path:'agregar', component:AgregarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecretoRoutingModule { }
