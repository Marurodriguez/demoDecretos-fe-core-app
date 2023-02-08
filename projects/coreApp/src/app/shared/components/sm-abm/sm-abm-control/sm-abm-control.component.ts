import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, Output, ViewEncapsulation, ViewChild, AfterContentChecked, AfterContentInit, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import swal from 'sweetalert2';
import { AbmObject } from '../../../../services/manager-abm.service';



@Component({
  selector: 'sm-abm-control',
  templateUrl: './sm-abm-control.component.html',
  styleUrls: ['./sm-abm-control.component.scss']
})

export class SmAbmControlComponent {
  /************************************************************************************************************************
   * Inputs && Outputs && Properties
   *
   ************************************************************************************************************************/
  @Input() component: AbmObject;
  @Input() disabled: boolean = false;
  public valor: any;

  /************************************************************************************************************************
   * Variables
   *
   ************************************************************************************************************************/
  @ViewChild('tableResponsive') tableResponsive: any;

  /************************************************************************************************************************
   * Constructor && Implements
   *
   ************************************************************************************************************************/
  constructor(private cd: ChangeDetectorRef){

  }


  isDisabled() {
    if((this.disabled && this.disabled == true ) || this.component.disabled == true) {
      return true;
    }else {
      return false;
    }
  }

  public getHtmlClass(): string {
    return this.component.htmlClass;
  }

  public getHtmlStyle(): string {
    return this.component.htmlStyle;
  }

  public getColHtmlClass(): string {
    return this.component.colHtmlClass;
  }

  public getType(): string {
    return this.component.type;
  }

  public getLabel(): string {
    return this.component.label;
  }

  public getName(): string {
    return this.component.name;
  }


  public getOptSmSelect(): any {
    return this.component.optSmSelect;
  }


}
