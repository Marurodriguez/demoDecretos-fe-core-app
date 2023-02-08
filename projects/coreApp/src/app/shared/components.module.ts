import { SmListadoComponent } from './components/sm-listado/listado-component/sm-listado.component';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipeModule } from './pipes/pipe.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SmAbmComponent } from './components/sm-abm/sm-abm.component';
import { SmAbmControlComponent } from './components/sm-abm/sm-abm-control/sm-abm-control.component';
// import { SmTableComponent } from './components/sm-table/sm-table.component';



@NgModule({
    exports: [
      // SmSelectComponent,
      SmListadoComponent,
      SmAbmControlComponent,
      SmAbmComponent,
      // SmTableComponent
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule,
      NgbModule,
      NgSelectModule,
      PipeModule,
      NgxDatatableModule
    ],
    declarations: [
      // SmSelectComponent,
      SmListadoComponent,
      SmAbmControlComponent,
      SmAbmComponent,
      // SmTableComponent
    ],
    providers: [
    ]
})
export class ComponentsModule { }
