import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { DataService } from './../services/data.services';
import { MainService } from './../services/main.service';
import { FunctionService } from './../services/function.services';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AuthUserService } from './auth/auth-user.service';



@NgModule({
    exports: [
    ],
    imports: [
        CommonModule,
    ],
    declarations: [

    ],
    providers: [
      AuthUserService,
      AuthService,
      AuthGuard,
      FunctionService,
      MainService,
      DataService
    ]
})
export class CoreModule { }
