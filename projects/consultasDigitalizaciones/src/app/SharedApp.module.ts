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
import { SmSelectComponent } from "../../../coreApp/src/app/shared/components/sm-select/sm-select.component";
import { PipeModule } from "../../../coreApp/src/app/shared/pipes/pipe.module";
import { ComponentsProyectModule } from "./components/components-proyect.module";
import { NavbarProjectComponent } from "./navigation/navbar/navbar-project.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SeccionTituloComponent } from "./components/seccion-titulo/seccion-titulo.component";
import { PeriodoSelectComponent } from "./components/periodo-select/periodo-select.component";
import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';

@NgModule({
  imports: [
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
    ComponentsProyectModule,
    ImageViewerModule
  ],
  exports: [
    SmSelectComponent,
    FooterComponent,
    NavbarProjectComponent,
    SeccionTituloComponent,
    PeriodoSelectComponent,
  ],
  declarations: [
    SmSelectComponent,
    FooterComponent,
    NavbarProjectComponent,
    SeccionTituloComponent,
    PeriodoSelectComponent,
  ],
  providers: [
  ],
})
export class SharedAppModule { }
