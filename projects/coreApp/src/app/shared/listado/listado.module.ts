import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ListadoComponent } from './listado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputListadoComponent } from './listado-components/input-listado-component/input-listado.component';

// Versión 2020.09.20
@NgModule({
    exports: [
        CommonModule,
        ListadoComponent,
        InputListadoComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        NgbDropdownModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ListadoComponent,
        InputListadoComponent
    ]
})
export class ListadoModule { }
