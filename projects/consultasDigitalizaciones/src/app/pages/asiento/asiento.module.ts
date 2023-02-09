import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { ComponentsModule } from '../../../../../coreApp/src/app/shared/components.module';
import { PipeModule } from '../../../../../coreApp/src/app/shared/pipes/pipe.module';
import { ComponentsProyectModule } from '../../components/components-proyect.module';
import { AsientoListadoComponent } from "./listado/asiento-listado.component";
import { AsientoAbmComponent } from "./abm/asiento-abm.component";
import { AsientoRoutingModule } from "./asiento-routing.module";
import { SharedAppModule } from "../../SharedApp.module";
import { AsientoRegistroAbmComponent } from "./abm/asiento-registro-abm/asiento-registro-abm.component";
import { UsuarioModel } from "../../models/Usuario.model";
import { UserService } from "../../services/User.service";


@NgModule({
  imports: [
    CommonModule,
    ComponentsProyectModule,
    ComponentsModule,
    // CoreModule,
    AsientoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    ChartistModule,
    NgxChartsModule,
    NgApexchartsModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    NgxDatatableModule,
    PipeModule,
    NgbTooltipModule,
    SharedAppModule
  ],
  exports: [],
  declarations: [
    AsientoListadoComponent,
    AsientoAbmComponent,
    AsientoRegistroAbmComponent
  ],
  providers: [

  ],
})
export class AsientoModule { }
