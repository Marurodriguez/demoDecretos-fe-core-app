import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { ErrorPageComponent } from "../../../../../../coreApp/src/app/pages/content-pages/error/error-page.component";
import { LoginPageComponent } from "../../../../../../coreApp/src/app/pages/content-pages/login/login-page.component";


@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule ,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule
    ],
    declarations: [
        ErrorPageComponent,
        LoginPageComponent
    ]
})
export class ContentPagesModule { }
