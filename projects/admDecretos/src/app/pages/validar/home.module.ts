import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";

import { HomeComponent } from "./home.component";
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ],
  exports: [],
  declarations: [
    HomeComponent
  ],
  providers: [],
})
export class HomeModule { }
