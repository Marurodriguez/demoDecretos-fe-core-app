import { SmTableComponent } from './listado/sm-table.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
    exports: [
        SmTableComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule ,
   ],
    declarations: [
        SmTableComponent
    ]
})
export class SmTableModule { }
