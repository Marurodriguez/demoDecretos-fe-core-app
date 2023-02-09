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
import { UserService } from "../../services/User.service";
import { SharedAppModule } from "../../SharedApp.module";
import { BalanceRoutingModule } from "./balance-routing.module";
import { BalanceComponent } from "./listado/balance.component";


@NgModule({
  imports: [
    CommonModule,
    ComponentsProyectModule,
    ComponentsModule,
    // CoreModule,
    BalanceRoutingModule,
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
    BalanceComponent,
  ],
  providers: [
    UserService
  ],
})
export class BalanceModule { }
